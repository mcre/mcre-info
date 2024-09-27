module.exports = {
  content: ['dist/**/*.html'],
  css: ['dist/assets/*.css'],
  safelist: {
    greedy: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      /data-v-.*/,
    ],
  },
  output: 'dist/assets/',
};
