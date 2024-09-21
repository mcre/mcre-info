import WebFont from "webfontloader";

export default {
  install() {
    WebFont.load({
      google: {
        families: ["Zen+Maru+Gothic:wght@300;400;500;700;900"],
      },
    });
  },
};
