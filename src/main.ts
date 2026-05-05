import type { RssArticle } from "@/apis/@types";
import { ViteSSG } from "vite-ssg/single-page";
import { registerPlugins } from "@/plugins";

import App from "./App.vue";

import "@/styles/global.scss";

const WEB_FONT_LOAD_DELAY_MS = 12_000;

const scheduleWebFontLoad = () => {
  const importWebFonts = () => {
    void import("./styles/fonts.scss");
  };

  const loadWebFontsWhenIdle = () => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(importWebFonts, { timeout: 2000 });
      return;
    }

    importWebFonts();
  };

  const scheduleDelayedLoad = () => {
    window.setTimeout(loadWebFontsWhenIdle, WEB_FONT_LOAD_DELAY_MS);
  };

  if (document.readyState === "complete") {
    scheduleDelayedLoad();
    return;
  }

  window.addEventListener("load", scheduleDelayedLoad, { once: true });
};

const toSearchIndexArticle = (article: RssArticle): RssArticle => ({
  link: article.link,
  title: article.title,
  description: "",
  published: article.published,
});

const fetchRssForInitialState = async () => {
  const rssStore = useRssStore();

  await Promise.all([rssStore.fetchRss("note"), rssStore.fetchRss("zenn")]);

  rssStore.articles.note = rssStore.articles.note.map((article) =>
    toSearchIndexArticle(article),
  );
  rssStore.articles.zenn = rssStore.articles.zenn.map((article) =>
    toSearchIndexArticle(article),
  );
  rssStore.loading = false;
  rssStore.error = null;
};

export const createApp = ViteSSG(App, async ({ app, initialState }) => {
  const { pinia } = registerPlugins(app);

  if (import.meta.env.SSR) {
    await fetchRssForInitialState();
    initialState.pinia = pinia.state.value;
  } else {
    pinia.state.value = initialState.pinia || {};
    scheduleWebFontLoad();
  }
});
