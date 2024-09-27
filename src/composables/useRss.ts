import aspida from "@aspida/fetch";
import api from "@/apis/$api";
import { RssArticle } from "@/apis/@types/index";

const baseURL = `https://${import.meta.env.VITE_API_DOMAIN_NAME}`;
const apiClient = api(aspida(fetch, { baseURL }));

export const useRss = async (path: "note" | "zenn"): Promise<RssArticle[]> => {
  let response: RssArticle[];

  try {
    if (path === "note") {
      response = await apiClient.v1.rss.note.$get();
    } else if (path === "zenn") {
      response = await apiClient.v1.rss.zenn.$get();
    } else {
      throw new Error(`Unsupported path: ${path}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch RSS data: ${error}`);
  }

  return response;
};
