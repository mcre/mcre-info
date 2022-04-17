import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { loadFonts } from './plugins/webfontloader'
loadFonts()

import vuetify from './plugins/vuetify'
app.use(vuetify)

import router from './router'
app.use(router)

import VueGtag from 'vue-gtag-next'
if (process.env.NODE_ENV === 'production') {
  app.use(VueGtag, {
    property: {
      id: 'G-EVL1PP92QT',
    },
  })
}

app.mount('#app')
