export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/what-input.js',
    '~/plugins/regexHelper.js',
    '~/plugins/axios.js',
  ],

  vue: {
    config: {
      productionTip: false,
    },
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/auth-next',
  ],

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      silentTranslationWarn: true,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    axios: {
      baseUrl: process.env.API_URL,
      credentials: true,
    },
  },
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL || 'http://localhost:80',
      },
    },
    plugins: [],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
