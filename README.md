# mcre-info

mcre の自己紹介サイト。
https://mcre.info

## 開発時メモ

初期設定

```
% npm init @vitejs/app mcre-info -- --template vue-ts
% cd mcre-info
% vue add vuetify
? Choose a preset: Vite Preview (Vuetify 3 + Vite)
```

エラー回避

```
npm i --save-dev @types/node
```

```
# vite.config.ts 3行目を変更
# import vuetify from '@vuetify/vite-plugin' # 変更前
const vuetify = require('@vuetify/vite-plugin')
```

eslint, prettier を追加。
設定値は package.json, .vscode/extentions.json に適宜設定。

```
npm i -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

.vscode/settings.json に追加

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

vue-router を追加。main.ts, router.ts を適宜変更。

```
npm install vue-router
```

### AWS 設定

#### S3 バケットの作成

- バケット名
  - mcre.info
- リージョン
  - ap-northeast-1
- パブリックアクセス
  - すべてブロック
- project
  - mcre.info
- バージョニング
  - 無効にする
- 暗号化
  - 無効

#### Lambda@Edge(Prerender)の作成

- IAM ロールの作成
  - ユースケース
    - Lambda
  - ポリシーのアタッチ
    - AWSAppSyncPushToCloudWatchLogs
  - タグ
    - project
      - mcre.info
  - ロール名
    - mcreinfo-prerender
  - 信頼されたエンティティを選択
    - カスタム信頼ポリシー

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": ["edgelambda.amazonaws.com", "lambda.amazonaws.com"]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Lambda バージニア北部リージョンに移動

- 一から作成
- 関数名
  - mcreinfo-redirect-to-prerender
- ランタイム
  - Node 14.x
- アクセス権限
  - 既存のロール
    - mcreinfo-prerender
- コード
  - ./backend/mcreinfo-redirect-to-prerender/index.js をコピペ
- バージョン

  - 新しいバージョンを発行

- 一から作成
- 関数名
  - mcreinfo-set-prerender-header
- ランタイム
  - Node 14.x
- アクセス権限
  - 既存のロール
    - mcreinfo-header
- コード
  - ./backend/mcreinfo-set-prerender-header/index.js をコピペ
- バージョン
  - 新しいバージョンを発行

#### CloudFront ディストリビューションの作成

- オリジンドメイン
  - mcre.info.s3.ap-northeast-1.amazonaws.com
- オリジンパス
  - 空白
- 名前
  - mcre.info
- S3 バケットアクセス
  - OAI を使用する
  - 新しい OAI を作成
    - そのまま作成ボタンを押す
  - バケットポリシー
    - はい、バケットポリシーを自動で更新します
- カスタムヘッダー
  - なにもしない
- オリジンシールド
  - いいえ
- デフォルトのキャッシュビヘイビア(デフォルトからの変更点のみ記載)
  - ビューワープロトコルポリシー
    - Redirect HTTP to HTTPS
  - キャッシュキーとオリジンリクエスト
    - Legacy cache settings
      - ヘッダー
        - 次のヘッダーを含める
          - X-Prerender-Cachebuster
          - X-Prerender-Token
          - X-Prerender-Host
          - X-Query-String
      - クエリ文字列
        - なし
      - cookie
        - なし
      - オブジェクトキャッシュ
        - Customize
          - 最小 TTL,最大 TTL, デフォルト TTL 共通
            - 31536000
        - レスポンスヘッダポリシー
          - なにもしない
  - 関数の関連付け
    - ビューワーリクエスト
      - Lambda@Edge
        - arn:aws:lambda:us-east-1:118834186871:function:mcreinfo-set-prerender-header:1
        - 本文を含めるにチェックしない
    - オリジンリクエスト
      - Lambda@Edge
        - arn:aws:lambda:us-east-1:118834186871:function:mcreinfo-redirect-to-prerender:1
        - 本文を含めるにチェックしない
- 関数の関連付け
  - すべてそのまま
- 設定
  - 1 箇所だけ変更
    - デフォルトルートオブジェクト
      - index.html

---

作成した後に修正

- タグ
  - project
    - mcre.info
- カスタムエラーレスポンスを作成
  - エラーコード
    - 403
  - TTL
    - 0
  - エラーレスポンスをカスタマイズ
    - はい
      - レスポンスページのパス
        - /
      - レスポンスコード
        - 200

# Prerender.io の設定

CloudFront の設定

- ビヘイビアを編集
  - キャッシュキーとオリジンリクエスト
    - Legacy cache settings
      - ヘッダー
        - 次のヘッダーを含める
          - X-Prerender-Cachebuster
          - X-Prerender-Token
          - X-Prerender-Host
          - X-Query-String
      - クエリ文字列
        - なし
      - cookie
        - なし
      - オブジェクトキャッシュ
        - Customize
          - 最小 TTL,最大 TTL, デフォルト TTL 共通
            - 31536000
        - レスポンスヘッダポリシー
          - なにもしない
  - 関数の関連付け
    - ビューワーリクエスト
      - Lambda@Edge
        - arn:aws:lambda:us-east-1:118834186871:function:mcreinfo-set-prerender-header:1
        - 本文を含めるにチェックしない
    - オリジンリクエスト
      - Lambda@Edge
        - arn:aws:lambda:us-east-1:118834186871:function:mcreinfo-redirect-to-prerender:1
        - 本文を含めるにチェックしない

# ドメイン設定

### 証明書発行

- バージニア北部リージョン

- AWS Certificate Manager で「証明書をリクエスト」

  - パブリック証明書をリクエスト
  - 完全修飾ドメイン名
    - mcre.info, \*.mcre.info
  - 検証方法
    - DNS 検証
  - タグ
    - project
      - mcre.info

- ステータスが「保留中の検証」になるので、「Route 53 でレコードを作成」ボタンを押す

- 「レコードを作成」ボタンを押し、暫く待つと「発行済み」になる

### CloudFront 設定

CloudFront のディストリビューションを選択する

- 設定の編集
  - 代替ドメイン名(CNAME)
    - mcre.info
  - カスタム SSL 証明書
    - mcre.info を選択
    - ほかデフォルト

### Route 53 設定

- ホストゾーン → mcre.info
- レコードを作成
  - クイック作成
  - レコード名
    - mcre.info
  - レコードタイプ
    - A
  - エイリアス
    - CloudFront ディストリビューションへのエイリアス
      - d30nih69c1jmwj.cloudfront.net
  - TTL
    - 300
  - ルーティングポリシー
    - シンプルルーティング
