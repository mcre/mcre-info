import { ViteSSG } from "vite-ssg/single-page";
import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import "@/styles/global.scss";

export const createApp = ViteSSG(App, ({ app, initialState }) => {
  const { pinia } = registerPlugins(app);

  if (!import.meta.env.SSR) {
    pinia.state.value = initialState.pinia || {};
  }
});
