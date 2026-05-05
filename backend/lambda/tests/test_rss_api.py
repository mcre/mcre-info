import json
import pathlib
import sys
import unittest
from unittest.mock import patch


LAMBDA_SRC = pathlib.Path(__file__).resolve().parents[1] / "src"
API_SRC = LAMBDA_SRC / "api"
sys.path.insert(0, str(LAMBDA_SRC))
sys.path.insert(0, str(API_SRC))

import main as rss_api  # noqa: E402


RSS_XML = """<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <item>
      <title>記事タイトル</title>
      <link>https://example.com/article</link>
      <description><![CDATA[<p>本文</p>]]></description>
      <pubDate>Mon, 04 May 2026 10:00:00 GMT</pubDate>
      <enclosure url="https://example.com/image.webp" />
    </item>
  </channel>
</rss>
"""


class LambdaContext:
    function_name = "test"
    memory_limit_in_mb = 128
    invoked_function_arn = "arn:aws:lambda:ap-northeast-1:123456789012:function:test"
    aws_request_id = "request-id"


def event(method="GET", proxy="/rss/zenn"):
    return {
        "httpMethod": method,
        "pathParameters": {"proxy": proxy},
        "queryStringParameters": None,
    }


class RssApiTest(unittest.TestCase):
    def setUp(self):
        rss_api.RSS_CACHE.clear()

    def test_parse_rss_keeps_japanese_json_fields(self):
        articles = rss_api.parse_rss(RSS_XML)

        self.assertEqual(articles[0]["title"], "記事タイトル")
        self.assertEqual(articles[0]["description"], "本文")
        self.assertEqual(articles[0]["enclosure"], "https://example.com/image.webp")
        self.assertIsInstance(articles[0]["published"], int)

    def test_get_zenn_rss_returns_json(self):
        with patch.object(rss_api, "fetch_url_text", return_value=RSS_XML):
            response = rss_api.main(event(proxy="/rss/zenn"), LambdaContext())

        self.assertEqual(response["statusCode"], 200)
        body = json.loads(response["body"])
        self.assertEqual(body[0]["title"], "記事タイトル")

    def test_uses_cache_for_repeated_rss_requests(self):
        with patch.object(rss_api, "fetch_url_text", return_value=RSS_XML) as fetch:
            rss_api.main(event(proxy="/rss/note"), LambdaContext())
            rss_api.main(event(proxy="/rss/note"), LambdaContext())

        self.assertEqual(fetch.call_count, 1)

    def test_unknown_route_returns_standard_404_error(self):
        response = rss_api.main(event(proxy="/rss/unknown"), LambdaContext())

        self.assertEqual(response["statusCode"], 404)
        self.assertEqual(json.loads(response["body"])["error"]["code"], "NOT_FOUND")

    def test_fetch_failure_returns_standard_500_error(self):
        with patch.object(rss_api, "fetch_url_text", side_effect=RuntimeError("down")):
            response = rss_api.main(event(proxy="/rss/zenn"), LambdaContext())

        self.assertEqual(response["statusCode"], 500)
        self.assertEqual(
            json.loads(response["body"])["error"]["code"],
            "UNEXPECTED_ERROR",
        )


if __name__ == "__main__":
    unittest.main()
