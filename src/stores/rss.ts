import type { RssArticle } from "@/apis/@types";

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
        const apiClient = useApi().publicApiClient();
        const response: RssArticle[] =
          path === "note"
            ? await apiClient.v1.rss.note.$get()
            : await apiClient.v1.rss.zenn.$get();

        this.articles[path] = response;
      } catch (error) {
        this.error = `RSSの取得に失敗しました: ${error}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
