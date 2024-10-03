import "vuetify/styles";

import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiYoutube,
  mdiWeb,
  mdiGithub,
  mdiLinkedin,
  mdiBookAlphabet,
  mdiNewspaper,
  mdiDog,
  mdiDumbbell,
  mdiAccountTie,
  mdiBrain,
  mdiChevronRight,
  mdiArmFlex,
} from "@mdi/js";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases: {
      mdiYoutube,
      mdiWeb,
      mdiGithub,
      mdiLinkedin,
      mdiBookAlphabet,
      mdiNewspaper,
      mdiDog,
      mdiDumbbell,
      mdiAccountTie,
      mdiBrain,
      mdiChevronRight,
      mdiArmFlex,
    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: "#F44336",
          "primary-darken-1": "#E53935",
          secondary: "#FFEBEE",
          "secondary-darken-1": "#FFCDD2",
          info: "#42A5F5",
          // error: '#B00020',
          // success: '#4CAF50',
          // warning: '#FB8C00',
        },
      },
    },
  },
});
