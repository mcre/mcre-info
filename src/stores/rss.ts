import { defineStore } from "pinia";
import aspida from "@aspida/fetch";
import api from "@/apis/$api";
import { RssArticle } from "@/apis/@types/index";

const baseURL = `https://${import.meta.env.VITE_API_DOMAIN_NAME}`;
const apiClient = api(aspida(fetch, { baseURL }));

export const useRssStore = defineStore("rss", {
  state: () => ({
    articles: {
      note: [] as RssArticle[],
      zenn: [] as RssArticle[],
    },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchRss(path: "note" | "zenn") {
      this.loading = true;
      this.error = null;

      try {
        let response: RssArticle[];

        if (path === "note") {
          response = await apiClient.v1.rss.note.$get();
        } else if (path === "zenn") {
          response = await apiClient.v1.rss.zenn.$get();
        } else {
          throw new Error(`Unsupported path: ${path}`);
        }

        this.articles[path] = response;
      } catch (error) {
        this.error = `Failed to fetch RSS data: ${error}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
