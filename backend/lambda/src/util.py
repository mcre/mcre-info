import json
import logging
from decimal import Decimal
from typing import Any, Dict, List, Tuple
from urllib.parse import unquote


class LambdaLogger:
    def __init__(self) -> None:
        logging.basicConfig(level=logging.INFO)
        self._logger = logging.getLogger(__name__)

    def inject_lambda_context(self, log_event: bool = False):
        def decorator(handler):
            def wrapper(event: dict, context: Any) -> dict:
                if log_event:
                    self._logger.debug("event=%s", event)
                return handler(event, context)

            return wrapper

        return decorator

    def exception(self, message: str, *args: Any) -> None:
        self._logger.exception(message, *args)


logger = LambdaLogger()


def _decimal_default(obj: Any) -> int | float:
    if isinstance(obj, Decimal):
        if obj == obj.to_integral_value():
            return int(obj)
        return float(obj)
    raise TypeError


def parse_request(event: dict) -> Tuple[str, int, List[str], Dict[str, str]]:
    proxy_path = (event.get("pathParameters") or {}).get("proxy") or ""
    method = event.get("httpMethod") or ""
    api_parts = [unquote(part) for part in proxy_path.split("/") if part]
    query_string = event.get("queryStringParameters") or {}
    return method, len(api_parts), api_parts, query_string


def api_response(body: Any = None, status_code: int = 200) -> dict:
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
        "body": json.dumps(body, default=_decimal_default, ensure_ascii=False),
    }


def api_error_response(status_code: int, error_code: str, message: str) -> dict:
    return api_response(
        status_code=status_code,
        body={
            "error": {
                "code": error_code,
                "message": message,
            }
        },
    )
