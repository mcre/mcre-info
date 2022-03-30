mcre-info
================

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

