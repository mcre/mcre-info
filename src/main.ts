import { registerPlugins } from "@/plugins";
import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";

import "@/styles/global.scss";

import "@fontsource/zen-maru-gothic/400.css";
import "@fontsource/zen-maru-gothic/700.css";

import { useRssStore } from "@/stores/rss";

export const createApp = ViteSSG(App, async ({ app, initialState }) => {
  registerPlugins(app);

  if (import.meta.env.SSR) {
    const rssStore = useRssStore();
    await rssStore.fetchRss("note");
    await rssStore.fetchRss("zenn");

    initialState.pinia = app.config.globalProperties.$pinia.state.value;
  } else {
    app.config.globalProperties.$pinia.state.value = initialState.pinia || {};
  }
});
