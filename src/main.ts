import { ViteSSG } from "vite-ssg/single-page";
import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import "@/styles/global.scss";

const scheduleWebFontLoad = () => {
  const loadWebFonts = () => {
    window.setTimeout(() => {
      void import("./styles/fonts.scss");
    }, 1200);
  };

  if (document.readyState === "complete") {
    loadWebFonts();
    return;
  }

  window.addEventListener("load", loadWebFonts, { once: true });
};

export const createApp = ViteSSG(App, ({ app, initialState }) => {
  const { pinia } = registerPlugins(app);

  if (!import.meta.env.SSR) {
    pinia.state.value = initialState.pinia || {};
    scheduleWebFontLoad();
  }
});
