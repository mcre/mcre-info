import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_teg32h } from './v1/rss/note';
import type { Methods as Methods_1nk9mp4 } from './v1/rss/zenn';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/v1/rss/note';
  const PATH1 = '/v1/rss/zenn';
  const GET = 'GET';

  return {
    v1: {
      rss: {
        note: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_teg32h['get']['resBody'], BasicHeaders, Methods_teg32h['get']['status']>(prefix, PATH0, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_teg32h['get']['resBody'], BasicHeaders, Methods_teg32h['get']['status']>(prefix, PATH0, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
        zenn: {
          /**
           * @returns 成功
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1nk9mp4['get']['resBody'], BasicHeaders, Methods_1nk9mp4['get']['status']>(prefix, PATH1, GET, option).json(),
          /**
           * @returns 成功
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_1nk9mp4['get']['resBody'], BasicHeaders, Methods_1nk9mp4['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH1}`,
        },
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
