import en from './assets/locales/en'
import ar from './assets/locales/ar'


export default  {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // ssr: true,
  head: {
    target: "server",
    titleTemplate: '%s - nuxt-shop-app',
    title: 'nuxt-shop-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/i18n-config.js' },
    { src: '~plugins/filter.js' },
    { src: '~plugins/vue-zoom-on-hover.js' },
    // { src: '~plugins/vuetify.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/Shop/' }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ['@nuxtjs/i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',  // recommended
      }
    }]
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://student.valuxapps.com/api/'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    optionsPath: './config/vuetify.options.js'
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'ar',
        iso: 'ar-EG'
      }
    ],
    // locales: ["en", "ar"],
    defaultLocale: 'en',
    vueI18n: {
      messages: {
        "en": en,
        "ar": ar,
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
