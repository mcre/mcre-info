import os
import string
from typing import Dict, Union

from aws_cdk import (
    Stack,
    Tags,
    Duration,
    RemovalPolicy,
    Size,
    aws_lambda as lambda_,
    aws_iam as iam,
    aws_logs as logs,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as route53_targets,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as cloudfront_origins,
    aws_apigateway as apigateway,
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


def create_lambda_layer(scope: Stack, name: str, zip_name: str):
    resource = lambda_.LayerVersion(
        scope,
        f"lambda-layer-{name}",
        layer_version_name=f"{config['prefix']}-{name}",
        code=lambda_.Code.from_asset(f"layers/{zip_name}.zip"),
        compatible_runtimes=[lambda_.Runtime.PYTHON_3_12],
    )
    return resource


def create_lambda_function(
    scope: Stack,
    name: str,
    policies: list = [],
    environment: dict = {},
    layers: list = [],
) -> lambda_.Function:
    policies.append(
        iam.PolicyStatement(
            actions=[
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
            ],
            resources=["arn:aws:logs:*:*:*"],
        )
    )

    iam_role_name = f"{config['prefix']}-lambda-{name}"
    iam_role = iam.Role(
        scope,
        f"iam-role-lambda-{name}",
        role_name=iam_role_name,
        assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
        inline_policies={
            f"{iam_role_name}-policy": iam.PolicyDocument(statements=policies)
        },
    )
    add_tags(iam_role)

    resource = lambda_.Function(
        scope,
        f"lambda-function-{name}",
        function_name=f"{config['prefix']}-{name}",
        code=lambda_.InlineCode("def main(event, context):\n    pass"),
        handler="main.main",
        runtime=lambda_.Runtime.PYTHON_3_12,
        memory_size=config["lambda"][name]["memory"],
        timeout=Duration.seconds(config["lambda"][name]["timeout_in_seconds"]),
        role=iam_role,
        log_retention=logs.RetentionDays.INFINITE,
        ephemeral_storage_size=Size.mebibytes(512),
        environment=environment,
        layers=layers,
    )

    add_tags(resource)
    return resource


def create_api_gateway(
    scope: Stack,
    name: str,
    target_lambda: lambda_.Function,
    acm_result: Dict[str, Union[acm.Certificate, route53.HostedZone, str]],
    cors_allow_origins: list = [],
) -> apigateway.RestApi:
    resource = apigateway.RestApi(
        scope,
        f"api-gateway-{name}",
        rest_api_name=f"{config['prefix']}-{name}",
        endpoint_types=[apigateway.EndpointType.REGIONAL],
        min_compression_size=Size.bytes(0),
    )
    add_tags(resource)

    lambda_integration = apigateway.LambdaIntegration(target_lambda)
    proxy_resource = resource.root.add_resource("{proxy+}")
    proxy_resource.add_method("ANY", lambda_integration)

    if len(cors_allow_origins) > 0:
        proxy_resource.add_cors_preflight(allow_origins=cors_allow_origins)

    custom_domain = apigateway.DomainName(
        scope,
        f"api-gateway-domain-{name}",
        domain_name=acm_result["domain_name"],
        certificate=acm_result["certificate"],
        endpoint_type=apigateway.EndpointType.REGIONAL,
        security_policy=apigateway.SecurityPolicy.TLS_1_2,
    )
    add_tags(custom_domain)

    domain_config = config["api-gateway"]["domain"][name]
    apigateway.BasePathMapping(
        scope,
        f"base-path-mapping-{name}",
        domain_name=custom_domain,
        rest_api=resource,
        stage=resource.deployment_stage,
        base_path=domain_config.get("base_path"),
    )

    route53.ARecord(
        scope,
        f"api-gateway-a-record-{name}",
        record_name=acm_result["domain_name"].split(".")[0],
        zone=acm_result["hosted_zone"],
        target=route53.RecordTarget.from_alias(
            route53_targets.ApiGatewayDomain(custom_domain)
        ),
    )
    return resource


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
) -> cloudfront.Distribution:
    custom_cache_policy = cloudfront.CachePolicy(
        scope,
        f"{name}-CustomCachePolicy",
        cache_policy_name=f"{config['prefix']}-{name}",
        comment="Custom cache policy for efficient caching in browsers",
        default_ttl=Duration.days(30),
        max_ttl=Duration.days(365),
        min_ttl=Duration.seconds(0),
        header_behavior=cloudfront.CacheHeaderBehavior.allow_list(
            "Cache-Control", "Expires"
        ),
        cookie_behavior=cloudfront.CacheCookieBehavior.none(),
        query_string_behavior=cloudfront.CacheQueryStringBehavior.all(),
        enable_accept_encoding_gzip=True,
        enable_accept_encoding_brotli=True,
    )

    resource = cloudfront.Distribution(
        scope,
        f"cloudfront-distribution-{name}",
        certificate=acm_result["certificate"],
        domain_names=[acm_result["domain_name"]],
        default_behavior=cloudfront.BehaviorOptions(
            origin=cloudfront_origins.S3BucketOrigin.with_origin_access_control(bucket),
            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cache_policy=custom_cache_policy,
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
        record_name=".".join(domain_parts) if len(domain_parts) >= 3 else None,
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
