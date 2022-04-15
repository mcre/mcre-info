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
