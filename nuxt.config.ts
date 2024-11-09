import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    '@pinia/nuxt'
  ],

  compatibilityDate: "2024-11-05",

  app: {
    buildAssetsDir: '/_nuxt/',
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  vite: {
    build: {
      sourcemap: false
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    }
  },

  nitro: {
    experimental: {
      openAPI: true
    },
    devProxy: {
      '/api/sms': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sms/, '')
      }
    }
  },

  runtimeConfig: {
    ALIBABA_CLOUD_ACCESS_KEY_ID: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
    ALIBABA_CLOUD_ACCESS_KEY_SECRET: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
    public: {}
  }
});
