# cd backend/lambda/api
# python test.py

import json

import main


event = {
    "httpMethod": "GET",
    "pathParameters": {"proxy": "/rss/zenn"},
}


class LambdaContext:
    def __init__(self):
        self.function_name = "test_lambda_function"
        self.memory_limit_in_mb = 128
        self.invoked_function_arn = (
            "arn:aws:lambda:us-west-2:123456789012:function:test_lambda_function"
        )
        self.aws_request_id = "test_request_id"


response = main.main(event, LambdaContext())


# print(json.dumps(response["body"], indent=2))
