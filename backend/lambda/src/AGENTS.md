# AGENTS ガイドライン

この指示は `backend/lambda/src/` 配下に適用する。

- Lambda ランタイムは Python 3.13。
- `util.py` は API Gateway イベント解析、JSON レスポンス、標準エラーなど、複数 API で共有できる処理を置く。
- `api/main.py` は RSS API のルート定義、RSS 取得、Lambda エントリポイントに寄せる。
- RSS の解析・キャッシュ・エラー処理を変える場合は、先に `backend/lambda/tests/` の unittest を更新する。
