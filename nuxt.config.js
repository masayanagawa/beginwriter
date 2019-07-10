
require('dotenv').config();
const { API_URL, API_KEY, AMPLIFY_AUTH_REGION, AMPLIFY_AUTH_USER_POOL_ID, AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID, AMPLIFY_AUTH_IDENTITY_POOL_ID } = process.env
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */

  loading: { 
    color: 'linear-gradient(to right,red,orange,yellow,green,aqua,blue,purple)',
    continuous: true,
    height: '3px'
  },

  // loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/amplify_init.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
    // '@nuxtjs/auth'
  ],
  axios: {
    
  },
  markdownit: {
    preset: 'markdown',
    injected: true, 
    breaks: false, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },
  // auth: {

  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  env: {
    API_URL,
    API_KEY,
    AMPLIFY_AUTH_REGION, 
    AMPLIFY_AUTH_USER_POOL_ID, 
    AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID, 
    AMPLIFY_AUTH_IDENTITY_POOL_ID
  }
}
