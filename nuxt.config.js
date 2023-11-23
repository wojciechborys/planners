// const LANG = 'en_US';
// const TYPE = 'website';
// const URL = 'https://hippocrades.com';
// const SITE_NAME = 'hippocrades.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
import { createPinia } from 'pinia';
import { userToken } from './src/stores/store';

export default defineNuxtConfig({
  preset: 'node-server',
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-gtag',
    '@pinia/nuxt',
  ],

  gtag: {
    id: 'G-M1KERXTK1H', // TODO: Add your google analytics 4 tag here
  },

  css: ['@/assets/scss/main.scss'],

  srcDir: './src',

  runtimeConfig: {
    public: {
      yourEnv: process.env.NUXT_API_BASE_URL,
      apiPublic: process.env.NUXT_API_PUBLIC,
      // TODO create proxy, make this key private
      apiSecret: process.env.NUXT_API_SECRET,
    },
  },

  plugins: [
    {
      src: '@/plugins/aos',
      ssr: false,
      mode: 'client',
    },
  ],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css',
        },
      ],
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },

  headlessui: {
    prefix: 'Headless',
  },

  build: {
    extend(config, ctx) {
      config.resolve.symlinks = false;
    },

    babel: {
      plugins: [
        ['@babel/plugin-transform-template-literals', { quoteStyle: 'double' }],
      ],
    },
  },

  image: {
    dir: 'assets/images',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
      '3xl': 1920,
    },
  },

  devtools: {
    enabled: true,
  },
});
