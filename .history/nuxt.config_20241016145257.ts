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
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@vite-pwa/nuxt",
    
    '@pinia/nuxt'
  ],
  router: {
    middleware: ['auth'] // 全局启用 auth 中间件
  },
});
