import os
from aws_cdk import (
    App,
    Environment,
    Stack,
    CfnOutput,
    aws_iam as iam,
    aws_lambda as lambda_,
)


from resources import (
    create_acm_certificate,
    create_lambda_layer,
    create_lambda_function,
    create_s3_bucket,
    create_cloudfront,
    create_iam_role_github_actions,
    create_api_gateway,
)
from config import get_env_config


# 開始処理
config = get_env_config()
app = App()


# ===== JPリージョン =====
stack = Stack(
    app,
    f"{config['prefix']}-stack",
    env=Environment(region="ap-northeast-1"),
)

# Lambda
layer_requests = create_lambda_layer(stack, "requests", "requests-2.32.3")
layer_powertools = lambda_.LayerVersion.from_layer_version_arn(
    stack,
    "lambda-layer-powertools",
    "arn:aws:lambda:ap-northeast-1:017000801446:layer:AWSLambdaPowertoolsPythonV2:78",
)


lambda_api = create_lambda_function(
    stack,
    "api",
    layers=[layer_requests, layer_powertools],
)

# api-gateway
dist_domain_config = config["cloudfront"]["domain"]["dist"]
if "name" in dist_domain_config:
    dist_domain_name = f"{dist_domain_config['name']}.{dist_domain_config['zone_name']}"
else:
    dist_domain_name = dist_domain_config["zone_name"]

acm_result_api = create_acm_certificate(
    stack, "api", config["api-gateway"]["domain"]["api"]
)
create_api_gateway(
    stack,
    "api",
    lambda_api,
    acm_result_api,
    cors_allow_origins=[dist_domain_name, "http://localhost:3000"],
)

github_actions_lambda_deploy_targets = [lambda_api]

# ===== USリージョン =====
# CloudFront関係はUSリージョンにある必要がある

stack_us = Stack(
    app,
    f"{config['prefix']}-stack-us-east-1",
    env=Environment(region="us-east-1"),
)

# S3
bucket_distribution = create_s3_bucket(stack_us, "dist")

# ACM
acm_result_dist = create_acm_certificate(
    stack_us, "dist", config["cloudfront"]["domain"]["dist"]
)

# CloudFront
cloudfront_distribution = create_cloudfront(
    stack_us,
    "dist",
    bucket_distribution,
    acm_result_dist,
)

# ===== 終了処理 =====
# Github Actions用のIAM Role
policies = [
    iam.PolicyStatement(
        actions=["s3:ListBucket", "s3:PutObject", "s3:DeleteObject"],
        resources=[
            bucket_distribution.bucket_arn,
            f"{bucket_distribution.bucket_arn}/*",
        ],
    ),
    iam.PolicyStatement(
        actions=["lambda:UpdateFunctionCode"],
        resources=[
            lambda_function.function_arn
            for lambda_function in github_actions_lambda_deploy_targets
        ],
    ),
    iam.PolicyStatement(
        actions=["cloudfront:GetInvalidation", "cloudfront:CreateInvalidation"],
        resources=[
            f"arn:aws:cloudfront::{config['account_id']}:distribution/{cloudfront_distribution.distribution_id}"
        ],
    ),
]
iam_role_github_actions = create_iam_role_github_actions(stack_us, policies)

# 後続処理で参照するパラメータを出力する処理
CfnOutput(stack, "Prefix", value=config["prefix"])
CfnOutput(stack, "DomainNameApi", value=acm_result_api["domain_name"])
CfnOutput(
    stack,
    "LambdaFunctions",
    value=",".join(
        [
            lambda_function.function_name
            for lambda_function in github_actions_lambda_deploy_targets
        ]
    ),
)
CfnOutput(stack_us, "IamRoleGithubActions", value=iam_role_github_actions.role_arn)
CfnOutput(stack_us, "DomainNameDistribution", value=acm_result_dist["domain_name"])
CfnOutput(stack_us, "BucketDistribution", value=bucket_distribution.bucket_name)
CfnOutput(
    stack_us, "CloudfrontDistribution", value=cloudfront_distribution.distribution_id
)

# 終了処理
app.synth()
