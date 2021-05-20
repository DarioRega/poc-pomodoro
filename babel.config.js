module.exports = {
  presets: ['@vue/app'],
  plugins: [
    // https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-830577523
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
}
