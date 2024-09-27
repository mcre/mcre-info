import { registerPlugins } from "@/plugins";
import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";

import "@/styles/global.scss";

import "@fontsource/zen-maru-gothic/400.css";
import "@fontsource/zen-maru-gothic/700.css";

import { useRss } from "@/composables/useRss";

export const createApp = ViteSSG(App, async (ctx) => {
  registerPlugins(ctx.app);

  if (import.meta.env.SSR) {
    const articles = await useRss("note");
    ctx.initialState.articles = articles;
  }
});
