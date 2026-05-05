import { ViteSSG } from "vite-ssg/single-page";
import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import "@/styles/global.scss";

export const createApp = ViteSSG(App, async ({ app, initialState }) => {
  const { pinia } = registerPlugins(app);

  if (import.meta.env.SSR) {
    const rssStore = useRssStore(pinia);
    await rssStore.fetchRss("note");
    await rssStore.fetchRss("zenn");

    initialState.pinia = pinia.state.value;
  } else {
    pinia.state.value = initialState.pinia || {};
  }
});
