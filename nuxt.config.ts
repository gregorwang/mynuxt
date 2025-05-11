import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }, 
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    '@pinia/nuxt',
    '@nuxtjs/proxy'
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
    proxy: {
      '/api/sms': {
        target: process.env.API_BASE_URL || 'http://121.199.73.119:8080',
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
