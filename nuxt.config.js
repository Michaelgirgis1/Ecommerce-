import colors from 'vuetify/es5/util/colors'
require('dotenv').config({ path: '.env.' + process.env.ENV })
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'FMApp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'swiper/swiper-bundle.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-tel-input', mode: 'client' },
    '~/plugins/comandaz-content.js',
    { src: './plugins/vue-awesome-swiper.js', ssr: false },
    { src: './plugins/v-calendar.js', ssr: false },
    '~/plugins/fontawesome.js',
    '~/plugins/mixins'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@nuxtjs/dotenv', { filename: '.env.' + process.env.ENV }],
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
    // '@nuxtjs/fontawesome'
  ],
  // fontawesome: {
  //   component: 'Fa',
  //   suffix: false,
  //   icons: {
  //     solid: true,
  //     brands: true
  //   }
  // },
  // fontawesome: {
  //   icons: [
  //     ...
  //   ]
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    ['bootstrap-vue/nuxt']
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL || 'http://dev.magento.com/rest/V1'
    // retry: { retries: 3 }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/default/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    strategies: {
      local: {
        // scheme: "refresh",
        token: {
          property: 'token', // property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        redirect: {
          login: '/home',
          logout: false,
          home: false
        },
        user: {
          property: [],
          autoFetch: true
        },
        // refreshToken: {  // it sends request automatically when the access token expires, and its expire time has set on the Back-end and does not need to we set it here, because is useless
        // property: "refresh_token", // property name that the Back-end sends for you as a refresh token for saving on localStorage and cookie of user browser
        // data: "refresh_token", // data can be used to set the name of the property you want to send in the request.
        // },
        endpoints: {
          login: { url: 'http://dev.magento.com/rest/ar/V1/integration/customer/token', method: 'post', propertyName: '' },
          refresh: { url: 'http://dev.magento.com/rest/ar/V1/integration/customer/token', method: 'post' },
          logout: { url: 'http://dev.magento.com/rest/ar/V1/customerLogout', method: 'get' }, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: { url: 'http://dev.magento.com/rest/ar/V1/customers/me', method: 'get' }
        }
      }
    },
    plugins: [{ src: '~/plugins/auth.js', mode: 'client' }]
  }
}
