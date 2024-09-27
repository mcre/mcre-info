import datetime as dt
import json
import time
from typing import Tuple

import aws_lambda_powertools

# --- logger ---

logger = aws_lambda_powertools.Logger()

# --- utility functions ---


def parse_request(event: dict) -> Tuple[str, int, str, dict]:
    api = event.get("pathParameters", {}).get("proxy", None)
    method = event.get("httpMethod", None)
    api_parts = [item for item in api.split("/") if len(item) > 0]
    qsp = event.get("queryStringParameters", {})
    if qsp is None:
        qsp = {}
    return method, len(api_parts), api_parts, qsp


def api_response(body: dict | list = {}, status_code: int = 200):
    logger.info(status_code)
    logger.info(body)
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST",
        },
        "body": json.dumps(body),
    }


def str_to_unixtime(pub_date_str):
    date_formats = [
        "%a, %d %b %Y %H:%M:%S %z",
        "%a, %d %b %Y %H:%M:%S GMT",
    ]

    for date_format in date_formats:
        try:
            d = dt.datetime.strptime(pub_date_str, date_format)
            return int(time.mktime(d.timetuple()))
        except ValueError:
            continue
    return None
