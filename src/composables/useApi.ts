import aspida from "@aspida/fetch";
import api from "@/apis/$api";

const baseURL = `https://${import.meta.env.VITE_API_DOMAIN_NAME}`;

export const useApi = () => {
  const publicApiClient = () => api(aspida(fetch, { baseURL }));

  return {
    publicApiClient,
  };
};
