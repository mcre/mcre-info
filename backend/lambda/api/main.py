import os
import sys
import re
import xml.etree.ElementTree as ET

import requests

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import util as u

ZENN_URL = "https://zenn.dev/m_cre/feed"
NOTE_URL = "https://note.com/m_cre/rss"


def parse_rss(text):
    root = ET.fromstring(text)
    namespaces = {"media": "http://search.yahoo.com/mrss/"}

    items = []
    for item in root.findall(".//item"):
        link = item.find("link").text if item.find("link") is not None else ""
        title = item.find("title").text if item.find("title") is not None else ""
        description = (
            item.find("description").text
            if item.find("description") is not None
            else ""
        )
        pub_date = item.find("pubDate").text if item.find("pubDate") is not None else ""
        published_unixtime = u.str_to_unixtime(pub_date)

        description = description.strip()
        description = re.sub(r"\n", "<br>", description)
        description = re.sub(
            r'<a[^>]*href=["\']([^"\']*)["\']>続きをみる<\/a>', "", description
        )
        description = re.sub(r"<figure.*?>.*?<\/figure>", "", description)
        description = re.sub(r"<(p).*?>", "", description)
        description = re.sub(r"</(p)>", "", description)
        description = re.sub(r"<(h2).*?>", "<b>", description)
        description = re.sub(r"</(h2)>", "</b><br>", description)

        enclosure = (
            item.find("enclosure").attrib.get("url")
            if item.find("enclosure") is not None
            else None
        )
        if enclosure is None:
            enclosure = (
                item.find("media:thumbnail", namespaces).text
                if item.find("media:thumbnail", namespaces) is not None
                else None
            )

        items.append(
            {
                "link": link,
                "title": title,
                "description": description,
                "published": published_unixtime,
                "enclosure": enclosure,
            }
        )

    return items


def get_rss(rss_site: str):
    if rss_site == "note":
        rss_url = NOTE_URL
    elif rss_site == "zenn":
        rss_url = ZENN_URL
    else:
        return u.api_response(status_code=404)

    response = requests.get(rss_url, timeout=10)
    response.raise_for_status()
    return u.api_response(parse_rss(response.text))


@u.logger.inject_lambda_context(log_event=True)
def main(event, context):
    m, l, a, _ = u.parse_request(event)
    try:
        if m == "GET" and l == 2 and a[0] == "rss":
            return get_rss(a[1])
    except Exception as e:
        u.logger.exception(f"API処理中にエラー: {e}")
        return u.api_response(status_code=500)

    return u.api_response(status_code=404)
