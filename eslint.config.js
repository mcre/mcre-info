import eslintConfigPrettier from "eslint-config-prettier/flat";
import vuetify from "eslint-config-vuetify";

export default vuetify(
  {
    ts: true,
    ignore: {
      extendIgnore: [
        "backend/**",
        "dist/**",
        "src/apis/**",
        "src/auto-imports.d.ts",
        "src/components.d.ts",
        "public/llms*.txt",
        "public/profile.*",
        "public/robots.txt",
        "public/sitemap.xml",
      ],
    },
  },
  {
    files: ["**/*.{vue,js,ts,mts}"],
    rules: {
      "antfu/top-level-function": "off",
      "func-style": ["error", "expression", { allowArrowFunctions: true }],
      "prefer-arrow-callback": "error",
      "vue/no-v-text-v-html-on-component": "off",
    },
  },
  eslintConfigPrettier,
);
