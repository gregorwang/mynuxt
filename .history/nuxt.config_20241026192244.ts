export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
    runtimeConfig: {
      ZHIPU_API_KEY: process.env.ZHIPU_API_KEY // 加载环境变量
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
