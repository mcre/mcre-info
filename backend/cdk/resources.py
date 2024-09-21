import os
import string
from typing import Dict, Union

from aws_cdk import (
    Stack,
    Tags,
    Duration,
    RemovalPolicy,
    aws_lambda as lambda_,
    aws_iam as iam,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as route53_targets,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as cloudfront_origins,
)
from config import get_env_config

config = get_env_config()


def add_tags(resource) -> None:
    for tag in config["tags"]:
        Tags.of(resource).add(tag["key"], tag["value"])


def create_acm_certificate(
    scope: Stack, name: str, domain_config: dict
) -> Dict[str, Union[acm.Certificate, route53.HostedZone, str]]:
    existing_hosted_zone = route53.HostedZone.from_hosted_zone_attributes(
        scope,
        f"hosted-zone-{name}",
        hosted_zone_id=domain_config["hosted_zone_id"],
        zone_name=domain_config["zone_name"],
    )

    if "name" in domain_config:
        domain_name = f"{domain_config['name']}.{domain_config['zone_name']}"
    else:
        domain_name = domain_config["zone_name"]
    resource = acm.Certificate(
        scope,
        f"acm-certificate-{name}",
        domain_name=domain_name,
        validation=acm.CertificateValidation.from_dns(existing_hosted_zone),
    )
    add_tags(resource)

    return {
        "certificate": resource,
        "hosted_zone": existing_hosted_zone,
        "domain_name": domain_name,
    }


def create_lambda_edge_function_version(
    scope: Stack,
    name: str,
    replaces: dict = {},
    runtime: lambda_.Runtime = lambda_.Runtime.NODEJS_20_X,
) -> lambda_.Version:
    iam_role_name = f"{config['prefix']}-lambda-{name}"
    iam_role = iam.Role(
        scope,
        f"iam-role-lambda-{name}",
        role_name=iam_role_name,
        assumed_by=iam.CompositePrincipal(
            iam.ServicePrincipal("lambda.amazonaws.com"),
            iam.ServicePrincipal("edgelambda.amazonaws.com"),
        ),
        inline_policies={
            f"{iam_role_name}-policy": iam.PolicyDocument(
                statements=[
                    iam.PolicyStatement(
                        actions=[
                            "logs:CreateLogGroup",
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                        ],
                        resources=["arn:aws:logs:*:*:*"],
                    )
                ]
            )
        },
    )
    add_tags(iam_role)

    class AtTemplate(string.Template):
        delimiter = "@"

    work_dir = f"work/{name}"
    os.makedirs(work_dir, exist_ok=True)
    code_path = f"{work_dir}/index.js"
    with open(f"resource-files/lambda-edge/{name}/index.js", "r") as template_file:
        template_content = template_file.read()
    template = AtTemplate(template_content)
    code_content = template.substitute(replaces)
    with open(code_path, "w") as lambda_file:
        lambda_file.write(code_content)

    resource = lambda_.Function(
        scope,
        f"lambda-function-edge-{name}",
        function_name=f"{config['prefix']}-{name}",
        runtime=runtime,
        handler="index.handler",
        code=lambda_.Code.from_asset(work_dir),
        role=iam_role,
        current_version_options=lambda_.VersionOptions(
            removal_policy=RemovalPolicy.RETAIN
        ),
    )
    version = resource.current_version
    add_tags(resource)
    return version


def create_s3_bucket(scope: Stack, name: str) -> s3.Bucket:
    dp = config["s3"][name]["deletion_protection"]
    resource = s3.Bucket(
        scope,
        f"s3-bucket-{name}",
        bucket_name=f"{config['prefix']}-{name}",
        removal_policy=RemovalPolicy.RETAIN if dp else RemovalPolicy.DESTROY,
    )
    add_tags(resource)
    return resource


def create_cloudfront(
    scope: Stack,
    name: str,
    bucket: s3.Bucket,
    acm_result: Dict[str, Union[acm.Certificate, route53.HostedZone, str]],
    lambda_edge_version_redirect_to_prerender: lambda_.Version,
    lambda_edge_version_set_prerender_header: lambda_.Version,
) -> cloudfront.Distribution:
    cache_policy = cloudfront.CachePolicy(
        scope,
        f"cloudfront-cache-policy-{name}",
        cache_policy_name=f"{config['prefix']}-{name}-prerender-cache-policy",
        header_behavior=cloudfront.CacheHeaderBehavior.allow_list(
            "X-Prerender-Cachebuster",
            "X-Prerender-Token",
            "X-Prerender-Host",
            "X-Query-String",
        ),
        min_ttl=Duration.seconds(31536000),
        max_ttl=Duration.seconds(31536000),
        default_ttl=Duration.seconds(31536000),
    )
    resource = cloudfront.Distribution(
        scope,
        f"cloudfront-distribution-{name}",
        certificate=acm_result["certificate"],
        domain_names=[acm_result["domain_name"]],
        default_behavior=cloudfront.BehaviorOptions(
            origin=cloudfront_origins.S3BucketOrigin.with_origin_access_control(bucket),
            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cache_policy=cache_policy,
            edge_lambdas=[
                cloudfront.EdgeLambda(
                    function_version=lambda_edge_version_set_prerender_header,
                    event_type=cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
                ),
                cloudfront.EdgeLambda(
                    function_version=lambda_edge_version_redirect_to_prerender,
                    event_type=cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                ),
            ],
        ),
        default_root_object="index.html",
        error_responses=[
            cloudfront.ErrorResponse(
                http_status=403,
                response_http_status=200,
                response_page_path="/index.html",
                ttl=Duration.seconds(0),
            ),
            cloudfront.ErrorResponse(
                http_status=404,
                response_http_status=404,
                response_page_path="/404.html",
                ttl=Duration.seconds(0),
            ),
        ],
    )


    domain_parts = acm_result["domain_name"].split(".")
    route53.ARecord(
        scope,
        f"cloudfront-a-record-{name}",
        record_name=domain_parts if len(domain_parts) >= 3 else None,
        zone=acm_result["hosted_zone"],
        target=route53.RecordTarget.from_alias(
            route53_targets.CloudFrontTarget(resource)
        ),
    )

    add_tags(resource)
    return resource


def create_iam_role_github_actions(scope: Stack, policies: list = []) -> iam.Role:
    owner = "mcre"
    repo = "mcre-info"

    rg = "ap-northeast-1"
    id = config["account_id"]
    cdk_identifier = config["cdk_identifier"]

    policies.extend(
        [
            iam.PolicyStatement(
                actions=["ssm:GetParameter"],
                resources=[
                    f"arn:aws:ssm:us-east-1:{id}:parameter/cdk-bootstrap/{cdk_identifier}/*",
                    f"arn:aws:ssm:{rg}:{id}:parameter/cdk-bootstrap/{cdk_identifier}/*",
                ],
            ),
            iam.PolicyStatement(
                actions=["sts:AssumeRole"],
                resources=[
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-deploy-role-{id}-us-east-1",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-file-publishing-role-{id}-us-east-1",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-image-publishing-role-{id}-us-east-1",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-lookup-role--{id}-us-east-1",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-deploy-role-{id}-{rg}",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-file-publishing-role-{id}-{rg}",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-image-publishing-role-{id}-{rg}",
                    f"arn:aws:iam::{id}:role/cdk-{cdk_identifier}-lookup-role--{id}-{rg}",
                ],
            ),
            iam.PolicyStatement(
                actions=["s3:ListBucket", "s3:GetObject", "s3:PutObject"],
                resources=[
                    f"arn:aws:s3:::cdk-{cdk_identifier}-assets-{id}-us-east-1",
                    f"arn:aws:s3:::cdk-{cdk_identifier}-assets-{id}-us-east-1/*",
                    f"arn:aws:s3:::cdk-{cdk_identifier}-assets-{id}-{rg}",
                    f"arn:aws:s3:::cdk-{cdk_identifier}-assets-{id}-{rg}/*",
                ],
            ),
        ]
    )

    resource = iam.Role(
        scope,
        "iam-role-github-actions",
        role_name=f"{config['prefix']}-github-actions",
        assumed_by=iam.WebIdentityPrincipal(
            config["iam"]["open_id_connect_provider"]["github_arn"],
            {
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": f"repo:{owner}/{repo}:*"
                }
            },
        ),
        inline_policies={
            f"{config['prefix']}-github-actions-policy": iam.PolicyDocument(
                statements=policies
            )
        },
    )

    add_tags(resource)
    return resource
