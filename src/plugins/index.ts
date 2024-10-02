import type { App } from "vue";

import vuetify from "./vuetify";
import { createPinia } from "pinia";

export function registerPlugins(app: App) {
  app.use(vuetify).use(createPinia());
}
