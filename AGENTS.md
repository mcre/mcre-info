# AGENTS ガイドライン

この指示はリポジトリ全体に適用する。

## 最初に読むもの

依頼内容に応じて、必要なものだけ読む。

- 開発・検証コマンド: `package.json`
- プロフィール情報源: `src/content/profile.ts`
- 画面入口: `src/main.ts`, `src/App.vue`, `src/pages/HomePage.vue`
- Vuetify 設定: `src/plugins/vuetify.ts`, `src/styles/settings.scss`
- SSG / build 設定: `vite.config.mts`
- E2E 設定: `playwright.config.ts`, `e2e/`
- API 契約: `openapi.yaml`
- Lambda API: `backend/lambda/src/api/main.py`, `backend/lambda/src/util.py`
- CDK: `backend/cdk/app.py`, `backend/cdk/resources.py`, `backend/cdk/config/prod.json`, `backend/cdk/README.md`

## プロジェクトの目的

`mcre.info` の自己紹介サイトを SSG で配信する。人間向けのプロフィールページに加えて、検索エンジンと AI エージェントが読みやすい構造化データと Markdown/JSON アーティファクトを提供する。

## 開発ルール

- 常に日本語で会話する。
- 原則として TDD で進める。期待される入出力に基づき、まずテストを書き、失敗を確認してから実装する。
- コミットはユーザーが行う。Codex はコミットしない。
- 既存のコードスタイルとパターンに従う。
- プロジェクトコマンドは npm script を優先して使う。
- フロントエンドは TypeScript で実装する。
- Vue は `<script setup lang="ts">` を基本とする。
- `AutoImport` 対象の Vue / Pinia API、`src/composables`、`src/stores`、`src/content`、`useHead` は明示 import しない。
- `Components` 対象の `src/components` / `src/pages` 配下コンポーネントは、テンプレート利用だけなら明示 import しない。
- 明示 import は外部ライブラリ、型定義、設定ファイル、テスト、テンプレート以外で値として使うコンポーネントなど、AutoImport/Components で解決できないものに限定する。
- `defineProps` の公開型に使う型は、`vue-tsc` で private name 扱いになる場合があるため `import type` を残す。
- 関数は原則アロー関数で書く。
- 局所的な変数でも意味が薄い略語は避ける。
- コメントは複雑な処理にだけ書く。コードコメントの日本語は常体にする。
- SSG と sitemap 生成を維持する。SPA 化や router 導入は目的が明確な場合だけ行う。
- プロフィール本文、リンク、職歴、学歴、スキルを変える場合は `src/content/profile.ts` を更新し、Vue 表示・JSON-LD・AIO 生成を同じ情報源から反映する。
- 近代化やコンポーネント分割をしても、既存のプロフィール内容、リンク、カード、制作物、デザイン密度を勝手に減らさない。
- API 型を変える場合は `openapi.yaml` を編集し、`npm run api:build` で `src/apis/` を再生成する。
- 生成物は直接編集せず、元ファイルや生成コマンドを変更する。

## SSG / 表示検証

- このサイトでは `dist/index.html` が検索エンジンと crawler に見せる主要成果物である。
- 見た目の最終判断は `npm run dev` ではなく、`npm run build` 後の `npm run preview` で行う。
- `npm run e2e` は `npm run build` 後の `vite preview` に対して実行する。dev server だけを見て通した扱いにしない。
- SSR と CSR の差が大きくなる実装は避ける。主要レイアウトは `useDisplay()` で DOM を出し分けず、Vuetify の grid や CSS のレスポンシブ指定で調整する。
- SSG HTMLで確実に見せたい画像は、生成HTML上に実体が残る形にする。顔写真のような主要画像は通常の `img` を優先する。

## Vuetify 4 / Critical CSS

- `vite.config.mts` の `ssgOptions.beastiesOptions` は `false` のままにする。
- Vuetify 4 の CSS cascade layer と Critical CSS 抽出の組み合わせで、`dist/index.html` の CSS が壊れて preview 表示が崩れた実績がある。
- Critical CSS 抽出を再有効化する場合は、`dist/index.html` に壊れた `@layer` 断片がないこと、`dist/assets/app-*.css` が十分なサイズで生成されていること、`npm run preview` の表示、`npm run e2e` のすべてを確認する。

## Webfont

- Zen Maru Gothic はサイトの見た目として維持する。
- 軽量化のため Zen Maru Gothic は 400 / 700 の `unicode-range` 分割配信を使う。追加 weight や別フォントは増やさない。
- Webfont 読み込みは `src/styles/fonts.scss` で管理する。

## AIO / SEO

- `/llms.txt`, `/llms-full.txt`, `/profile.md`, `/profile.json`, `/robots.txt`, `/sitemap.xml` は `npm run site:build` で生成する。
- AI crawler は最大露出方針とし、検索系・学習系 crawler を拒否しない。
- canonical、description、OGP、`ProfilePage` + `Person` JSON-LD、`sameAs` はプロフィール情報と矛盾させない。

## バックエンド

- Lambda ランタイムは Python 3.13。
- `backend/lambda/src/api/main.py` はルート定義、RSS 取得、Lambda エントリポイントに寄せる。
- `backend/lambda/src/util.py` はリクエスト解析、JSON レスポンス、標準エラーレスポンスなどの共通処理に寄せる。
- RSS API の挙動を変えるときは `backend/lambda/tests/` の unittest を先に更新する。

## インフラ

- CDK 設定は `CDK_ENV=prod` で `backend/cdk/config/prod.json` を読む。
- CloudFront の証明書は `us-east-1`、アプリ本体の主要リソースは `ap-northeast-1`。
- prod deploy は実行しない。prod deploy の明示依頼があっても、実行せずに必要なら代替手順を提案する。

## よく使うコマンド

```sh
npm install
npm run dev
npm run format:check
npm run lint
npm run type-check
npm run test:unit
npm run build
npm run e2e
npm run lambda:test
npm run cdk:synth:prod
```

CDK は事前に `backend/cdk/.venv` を作成し、`backend/cdk/requirements.txt` をインストールする。

```sh
python3 -m venv backend/cdk/.venv
backend/cdk/.venv/bin/python -m pip install -r backend/cdk/requirements.txt
CDK_ENV=prod npm run cdk -- synth --all
```

## 編集してはいけないもの

- `node_modules/`
- `dist/`
- `backend/cdk/cdk.out/`
- `src/apis/` 配下の生成物
- `src/auto-imports.d.ts`
- `src/components.d.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/profile.md`
- `public/profile.json`
- `public/robots.txt`
- `public/sitemap.xml`

これらを更新する必要がある場合は、元ファイルや生成コマンドを変更する。
