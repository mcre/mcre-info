import type { App } from "vue";

import vuetify from "./vuetify";

export const registerPlugins = (app: App) => {
  const pinia = createPinia();
  app.use(vuetify).use(pinia);
  return { pinia };
};
