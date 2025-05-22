// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'
import { watch } from 'vue'

export default defineNuxtRouteMiddleware(async (to) => {
  // 仅在客户端检查，SSR 阶段跳过
  if (process.server) return

  const publicPages = ['/auth', '/law']
  const { user, ready } = useAuth()

  // 如果会话尚未恢复完成，且目标不是公开页，则等待 ready
  if (!ready.value && !publicPages.includes(to.path)) {
    await new Promise<void>((resolve) => {
      const stop = watch(ready, (val) => {
        if (val) {
          stop()
          resolve()
        }
      })
    })
  }

  // 会话恢复后，若用户未登录且目标不是公开页，则重定向到登录
  if (!user.value && !publicPages.includes(to.path)) {
    console.log('全局中间件：未认证，重定向到登录页')
    return navigateTo('/auth')
  }

  // 用户已登录
  if (user.value) {
    console.log(`全局中间件：用户已认证，用户邮箱: ${user.value.email}`)
  }
})
