import { fileURLToPath, URL } from "node:url";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import "vite-ssg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    AutoImport({
      imports: ["vue", "pinia", { "@unhead/vue": ["useHead"] }],
      dirs: ["src/composables", "src/stores", "src/content"],
      dts: "src/auto-imports.d.ts",
      vueTemplate: true,
    }),
    Components({
      dirs: ["src/components", "src/pages"],
      dts: "src/components.d.ts",
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["vuetify", "aspida", "@aspida/fetch"],
  },
  ssgOptions: {
    script: "async defer",
    formatting: "minify",
    dirStyle: "nested",
    // Vuetify 4のCSS cascade layerがCritical CSS抽出で崩れるため、SSG HTMLでは外部CSSをそのまま読む。
    beastiesOptions: false,
  },
});
