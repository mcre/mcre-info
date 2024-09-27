import { registerPlugins } from "@/plugins";
import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import "@/styles/global.scss";
import { useRss } from "@/composables/useRss";

export const createApp = ViteSSG(App, async (ctx) => {
  registerPlugins(ctx.app);

  if (import.meta.env.SSR) {
    const articles = await useRss("note");
    ctx.initialState.articles = articles;
  }
});
