import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import {
  VApp,
  VAppBar,
  VAvatar,
  VBtnGroup,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VChip,
  VCol,
  VContainer,
  VDivider,
  VIcon,
  VImg,
  VItemGroup,
  VLazy,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemHeader,
  VListItemSubtitle,
  VListItemTitle,
  VListSubheader,
  VMain,
  VRow,
  VSpacer,
  VTooltip,
} from 'vuetify/components'

import { aliases, mdi } from 'vuetify/lib/iconsets/mdi-svg'
import { ja } from 'vuetify/locale'

export default createVuetify({
  components: {
    VApp,
    VAppBar,
    VAvatar,
    VBtnGroup,
    VCard,
    VCardActions,
    VCardText,
    VCardTitle,
    VChip,
    VCol,
    VContainer,
    VDivider,
    VIcon,
    VImg,
    VItemGroup,
    VLazy,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemHeader,
    VListItemSubtitle,
    VListItemTitle,
    VListSubheader,
    VMain,
    VRow,
    VSpacer,
    VTooltip,
  },
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
