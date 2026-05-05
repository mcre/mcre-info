import {
  mdiAccountTie,
  mdiArmFlex,
  mdiBookAlphabet,
  mdiBrain,
  mdiBriefcase,
  mdiChevronRight,
  mdiDog,
  mdiDumbbell,
  mdiGamepadVariantOutline,
  mdiGithub,
  mdiLinkedin,
  mdiNewspaper,
  mdiSchool,
  mdiTools,
  mdiWeb,
  mdiYoutube,
} from "@mdi/js";
import { createVuetify } from "vuetify";
import { mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";

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
      mdiGamepadVariantOutline,
      mdiBrain,
      mdiChevronRight,
      mdiArmFlex,
      mdiBriefcase,
      mdiSchool,
      mdiTools,
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
