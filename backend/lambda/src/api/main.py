import email.utils
import html
import os
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from typing import Callable, Dict, List, Optional, Tuple


sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import util as u  # noqa: E402


ZENN_URL = "https://zenn.dev/m_cre/feed"
NOTE_URL = "https://note.com/m_cre/rss"
CACHE_TTL_SECONDS = 300
RSS_CACHE: Dict[str, Tuple[float, List[dict]]] = {}


def str_to_unixtime(pub_date: str) -> Optional[int]:
    if not pub_date:
        return None
    try:
        parsed = email.utils.parsedate_to_datetime(pub_date)
    except (TypeError, ValueError):
        return None
    return int(parsed.timestamp())


def clean_description(description: str) -> str:
    text = html.unescape(description or "").strip()
    text = re.sub(r"\n", "<br>", text)
    text = re.sub(r'<a[^>]*href=["\'][^"\']*["\']>続きをみる</a>', "", text)
    text = re.sub(r"<figure.*?>.*?</figure>", "", text, flags=re.DOTALL)
    text = re.sub(r"</?p.*?>", "", text)
    text = re.sub(r"<h2.*?>", "<b>", text)
    text = re.sub(r"</h2>", "</b><br>", text)
    return text.strip()


def parse_rss(text: str) -> List[dict]:
    root = ET.fromstring(text)
    namespaces = {"media": "http://search.yahoo.com/mrss/"}

    articles = []
    for item in root.findall(".//item"):
        link = item.findtext("link", default="")
        title = item.findtext("title", default="")
        description = clean_description(item.findtext("description", default=""))
        pub_date = item.findtext("pubDate", default="")

        enclosure = None
        enclosure_element = item.find("enclosure")
        if enclosure_element is not None:
            enclosure = enclosure_element.attrib.get("url")
        if enclosure is None:
            thumbnail_element = item.find("media:thumbnail", namespaces)
            if thumbnail_element is not None:
                enclosure = thumbnail_element.text

        articles.append(
            {
                "link": link,
                "title": title,
                "description": description,
                "published": str_to_unixtime(pub_date),
                "enclosure": enclosure,
            }
        )

    return articles


def fetch_url_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "mcre-info-rss-fetcher/1.0"},
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        return response.read().decode("utf-8")


def get_rss_url(rss_site: str) -> Optional[str]:
    if rss_site == "note":
        return NOTE_URL
    if rss_site == "zenn":
        return ZENN_URL
    return None


def get_rss(
    rss_site: str,
    fetch_text: Optional[Callable[[str], str]] = None,
    now: Optional[float] = None,
) -> dict:
    rss_url = get_rss_url(rss_site)
    if rss_url is None:
        return u.api_error_response(
            status_code=404,
            error_code="NOT_FOUND",
            message="APIが見つかりません",
        )

    current_time = time.time() if now is None else now
    cached = RSS_CACHE.get(rss_site)
    if cached and current_time - cached[0] < CACHE_TTL_SECONDS:
        return u.api_response(cached[1])

    text_fetcher = fetch_url_text if fetch_text is None else fetch_text
    articles = parse_rss(text_fetcher(rss_url))
    RSS_CACHE[rss_site] = (current_time, articles)
    return u.api_response(articles)


@u.logger.inject_lambda_context(log_event=True)
def main(event, context):
    method, length, parts, _query = u.parse_request(event)

    try:
        if method == "GET" and length == 2 and parts[0] == "rss":
            return get_rss(parts[1])
        return u.api_error_response(
            status_code=404,
            error_code="NOT_FOUND",
            message="APIが見つかりません",
        )
    except Exception as error:
        u.logger.exception("API処理中にエラー: %s", error)
        return u.api_error_response(
            status_code=500,
            error_code="UNEXPECTED_ERROR",
            message="不明なエラー",
        )
