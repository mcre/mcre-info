import vuetify from "./vuetify";
import webFontLoader from "./webfontloader";

import type { App } from "vue";

export function registerPlugins(app: App) {
  app.use(vuetify).use(webFontLoader);
}
