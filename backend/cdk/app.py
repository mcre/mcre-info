import os
from aws_cdk import (
    App,
    Environment,
    Stack,
    CfnOutput,
    aws_iam as iam,
)


from resources import (
    create_acm_certificate,
    create_lambda_edge_function_version,
    create_s3_bucket,
    create_cloudfront,
    create_iam_role_github_actions,
)
from config import get_env_config


# 開始処理
config = get_env_config()
app = App()


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

# Lambda
lambda_edge_version_redirect_to_prerender = create_lambda_edge_function_version(
    stack_us, "redirect-to-prerender"
)
lambda_edge_version_set_prerender_header = create_lambda_edge_function_version(
    stack_us,
    "set-prerender-header",
    {"PRERENDER_TOKEN": os.environ["PRERENDER_TOKEN"]},
)

# CloudFront
cloudfront_distribution = create_cloudfront(
    stack_us,
    "dist",
    bucket_distribution,
    acm_result_dist,
    lambda_edge_version_redirect_to_prerender,
    lambda_edge_version_set_prerender_header,
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
        actions=["cloudfront:GetInvalidation", "cloudfront:CreateInvalidation"],
        resources=[
            f"arn:aws:cloudfront::{config['account_id']}:distribution/{cloudfront_distribution.distribution_id}"
        ],
    ),
]
iam_role_github_actions = create_iam_role_github_actions(stack_us, policies)

# 後続処理で参照するパラメータを出力する処理
CfnOutput(stack_us, "Prefix", value=config["prefix"])
CfnOutput(stack_us, "IamRoleGithubActions", value=iam_role_github_actions.role_arn)
CfnOutput(stack_us, "DomainNameDistribution", value=acm_result_dist["domain_name"])
CfnOutput(stack_us, "BucketDistribution", value=bucket_distribution.bucket_name)
CfnOutput(
    stack_us, "CloudfrontDistribution", value=cloudfront_distribution.distribution_id
)

# 終了処理
app.synth()
