import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import { ja } from 'vuetify/locale'

export default createVuetify({
  defaults: {
    VCard: {
      elevation: 3,
    },
  },
  locale: {
    defaultLocale: 'ja',
    messages: { ja },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#F44336',
          'primary-darken-1': '#E53935',
          secondary: '#FFEBEE',
          'secondary-darken-1': '#FFCDD2',
          info: '#42A5F5',
          // error: '#B00020',
          // success: '#4CAF50',
          // warning: '#FB8C00',
        },
      },
    },
  },
})
