import type { RssArticle } from "@/apis/@types";

export const useRss = async (path: "note" | "zenn"): Promise<RssArticle[]> => {
  try {
    const apiClient = useApi().publicApiClient();
    return path === "note"
      ? await apiClient.v1.rss.note.$get()
      : await apiClient.v1.rss.zenn.$get();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`RSSの取得に失敗しました: ${message}`, { cause: error });
  }
};
