import { fileURLToPath, URL } from "node:url";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    Vue(),
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
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**", "dist/**", "backend/**"],
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    server: {
      deps: {
        inline: [/vuetify/],
      },
    },
  },
});
