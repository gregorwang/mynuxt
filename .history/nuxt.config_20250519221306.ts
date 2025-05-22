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
    },
    buildAssetsDir: '/_nuxt/',
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    "@vueuse/motion/nuxt",
    '@pinia/nuxt'
  ],

  compatibilityDate: "2024-11-05",

  vite: {
    build: {
      sourcemap: false
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    server: {
      proxy: {
        '/api/sms': {
          target: process.env.API_BASE_URL || 'http://121.199.73.119:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/sms/, '')
        }
      }
    }
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  },

  runtimeConfig: {
    ALIBABA_CLOUD_ACCESS_KEY_ID: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
    ALIBABA_CLOUD_ACCESS_KEY_SECRET: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
    // 仅服务器可读的 key（如果以后有 Service Role Key，可以放这里）
    // supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    }
  }
});