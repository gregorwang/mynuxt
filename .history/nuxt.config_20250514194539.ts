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
  routeRules: {
    // 将所有 /api/** 的请求代理到 'http://your-backend-api.com/**'
    '/api/**': {
      proxy: 'http://your-backend-api.com/**', // 将此 URL 替换为您的后端 API 地址
    },
    // 示例：如果您的后端 API 在 http://localhost:8000
    // '/api/**': { proxy: 'http://localhost:8000/**' },

    // 如果需要路径重写：
    // '/backend/api/**': {
    //   proxy: {
    //     to: 'http://your-backend-api.com/actual-path/**',
    //     // 可选：重写路径，例如移除 /backend/api 前缀
    //     // pathRewrite: {
    //     //   '^/backend/api': '', // 修正这里的笔误
    //     // },
    //   }
    // }
  },
  // 如果您之前在 modules 中添加了 @nuxtjs/proxy，请将其移除
  // modules: [
  //   '@nuxtjs/proxy', // <--- 如果存在，请删除这一行
  // ],
})
// 移除了末尾的 Zzz