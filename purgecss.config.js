module.exports = {
  content: ['dist/**/*.html'],
  css: ['dist/assets/*.css'],
  safelist: {
    standard: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      /^scale/,
      /^fade/,
      /^v-overlay/,
      /^v-tooltip/,
      /^v-ripple/,
    ],
    greedy: [
      /data-v-.*/,
    ],
  },
  output: 'dist/assets/',
};
