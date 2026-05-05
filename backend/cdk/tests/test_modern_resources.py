import importlib
import os
import pathlib
import sys
import unittest

from aws_cdk import App, Stack
from aws_cdk.assertions import Match, Template


CDK_ROOT = pathlib.Path(__file__).resolve().parents[1]
CACHING_OPTIMIZED_POLICY_ID = "658327ea-f89d-4fab-a63d-7e88639e58f6"
SECURITY_HEADERS_POLICY_ID = "67f7725c-6f97-4210-82d7-5512b31e9d03"


class ModernResourcesTest(unittest.TestCase):
    def setUp(self):
        os.environ["CDK_ENV"] = "prod"
        sys.path.insert(0, str(CDK_ROOT))
        for module_name in ["config", "resources"]:
            sys.modules.pop(module_name, None)

    def tearDown(self):
        sys.path = [path for path in sys.path if path != str(CDK_ROOT)]
        for module_name in ["config", "resources"]:
            sys.modules.pop(module_name, None)

    def test_lambda_uses_python_313_without_layers_by_default(self):
        resources = importlib.import_module("resources")
        app = App()
        stack = Stack(app, "test-stack")

        resources.create_lambda_function(stack, "api")

        template = Template.from_stack(stack)
        template.has_resource_properties(
            "AWS::Lambda::Function",
            {
                "Runtime": "python3.13",
                "Layers": Match.absent(),
            },
        )

    def test_distribution_bucket_blocks_public_access_and_is_encrypted(self):
        resources = importlib.import_module("resources")
        app = App()
        stack = Stack(app, "test-stack")

        resources.create_s3_bucket(stack, "dist")

        template = Template.from_stack(stack)
        template.has_resource_properties(
            "AWS::S3::Bucket",
            {
                "BucketEncryption": {
                    "ServerSideEncryptionConfiguration": Match.array_with(
                        [Match.object_like({"ServerSideEncryptionByDefault": {}})]
                    )
                },
                "PublicAccessBlockConfiguration": {
                    "BlockPublicAcls": True,
                    "BlockPublicPolicy": True,
                    "IgnorePublicAcls": True,
                    "RestrictPublicBuckets": True,
                },
            },
        )

    def test_cloudfront_uses_security_headers_and_asset_cache_behaviors(self):
        resources = importlib.import_module("resources")
        app = App()
        stack = Stack(app, "test-stack")

        bucket = resources.create_s3_bucket(stack, "dist")
        acm_result = resources.create_acm_certificate(
            stack,
            "dist",
            resources.config["cloudfront"]["dist"]["domain"],
        )
        resources.create_cloudfront(stack, "dist", bucket, acm_result)

        template = Template.from_stack(stack)
        template.has_resource_properties(
            "AWS::CloudFront::Distribution",
            {
                "DistributionConfig": Match.object_like(
                    {
                        "DefaultCacheBehavior": Match.object_like(
                            {
                                "ResponseHeadersPolicyId": SECURITY_HEADERS_POLICY_ID,
                            }
                        ),
                        "CacheBehaviors": Match.array_with(
                            [
                                Match.object_like(
                                    {
                                        "PathPattern": "/assets/*",
                                        "CachePolicyId": CACHING_OPTIMIZED_POLICY_ID,
                                        "ResponseHeadersPolicyId": SECURITY_HEADERS_POLICY_ID,
                                    }
                                ),
                                Match.object_like(
                                    {
                                        "PathPattern": "/img/*",
                                        "CachePolicyId": CACHING_OPTIMIZED_POLICY_ID,
                                        "ResponseHeadersPolicyId": SECURITY_HEADERS_POLICY_ID,
                                    }
                                ),
                            ]
                        ),
                    }
                )
            },
        )

    def test_github_actions_role_trusts_repo_and_can_use_cdk_bootstrap_roles(self):
        resources = importlib.import_module("resources")
        app = App()
        stack = Stack(app, "test-stack")

        resources.create_iam_role_github_actions(stack)

        template = Template.from_stack(stack)
        template.has_resource_properties(
            "AWS::IAM::Role",
            {
                "RoleName": "mcre-info-github-actions",
                "AssumeRolePolicyDocument": {
                    "Statement": Match.array_with(
                        [
                            Match.object_like(
                                {
                                    "Action": "sts:AssumeRoleWithWebIdentity",
                                    "Condition": {
                                        "StringLike": {
                                            "token.actions.githubusercontent.com:sub": "repo:mcre/mcre-info:*"
                                        }
                                    },
                                }
                            )
                        ]
                    )
                },
                "Policies": Match.array_with(
                    [
                        Match.object_like(
                            {
                                "PolicyDocument": {
                                    "Statement": Match.array_with(
                                        [
                                            Match.object_like(
                                                {"Action": "ssm:GetParameter"}
                                            ),
                                            Match.object_like(
                                                {"Action": "sts:AssumeRole"}
                                            ),
                                        ]
                                    )
                                }
                            }
                        )
                    ]
                ),
            },
        )


if __name__ == "__main__":
    unittest.main()
