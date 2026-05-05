# mcre-info

mcre の自己紹介サイト。

<https://mcre.info>

## 概要

Vue 3 / Vuetify 4 / Vite SSG で生成する静的なプロフィールサイトです。人間向けの表示に加えて、検索エンジンと AI agent が読みやすい構造化データ、Markdown、JSON を同じプロフィール情報から生成します。

## 構成

- フロントエンド: Vue 3, Vuetify 4, Pinia, Vite, vite-ssg
- テスト: Vitest, Vue Test Utils, Playwright
- API 型生成: OpenAPI, openapi2aspida, aspida
- Lambda: Python 3.13
- IaC: AWS CDK
- Node.js: 24 系

## 重要な設計メモ

### SSG と表示確認

このサイトでは `dist/index.html` が検索エンジンや crawler に見せる主要成果物です。開発中の見た目だけで判断せず、最終確認は必ず build 後の preview で行います。

```sh
npm run build
npm run preview
```

E2E も `npm run build` 後の `vite preview` に対して実行する設定です。`npm run e2e` は dev server ではなく、実際の `dist` 表示を検証します。

### Vuetify 4 と Critical CSS

Vuetify 4 は CSS cascade layer を使います。`vite-ssg` の Critical CSS 抽出を有効にすると、`dist/index.html` 内の CSS layer が崩れて preview 表示が大きく壊れたため、`vite.config.mts` では `beastiesOptions: false` にしています。

これを戻す場合は、最低でも以下を確認してください。

- `npm run build` 後の `dist/index.html` に壊れた `@layer` 断片がない
- `dist/assets/app-*.css` が生成され、Vuetify のスタイルが外部CSSとして読まれている
- `npm run preview` で顔写真、SNSリンク、カード幅、2カラム表示が崩れていない
- `npm run e2e` が通る

### プロフィール情報

プロフィール本文、リンク、職歴、学歴、スキル、制作物、AIO/SEO用の出力は `src/content/profile.ts` を単一の情報源にしています。表示コンポーネントだけを編集して情報を増減させると、JSON-LD や `/profile.json` と不整合になるため避けてください。

### Webfont

Zen Maru Gothic は維持しますが、軽量化のためローカル配布するウェイトは `japanese-400-normal.woff2` と `japanese-700-normal.woff2` のみです。`src/styles/fonts.scss` から読み込みます。

### AIO / SEO

`npm run site:build` で以下を生成します。

- `/llms.txt`
- `/llms-full.txt`
- `/profile.md`
- `/profile.json`
- `/robots.txt`
- `/sitemap.xml`

AI crawler は最大露出方針です。`robots.txt` では一般 crawler に加えて、OpenAI 系 crawler も明示的に許可します。

## 開発

```sh
npm install
npm run dev
```

`npm run dev` は OpenAPI 型生成、API watch、Vite dev server を並列起動します。

## 検証

コミット前の基本確認です。

```sh
npm run format:check
npm run lint
npm run type-check
npm run test:unit
npm run build
npm run e2e
```

バックエンドと CDK も触った場合は追加で実行します。

```sh
npm run lambda:test
npm run cdk:synth:prod
```

## 生成物

以下は直接編集せず、元ファイルや生成コマンドを変更してください。

- `dist/`
- `src/apis/`
- `src/auto-imports.d.ts`
- `src/components.d.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/profile.md`
- `public/profile.json`
- `public/robots.txt`
- `public/sitemap.xml`

## License

see [LICENSE](./LICENSE)
