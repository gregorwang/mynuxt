// composables/useAuth.ts
import { ref, readonly } from 'vue'
import type { User, Session } from '@supabase/supabase-js'
import { useNuxtApp } from '#app'

const user = ref<User | null>(null)
const ready = ref(false)
let authListener: { data: { subscription: any } } | null = null

export function useAuth() {
  const { $supabase } = useNuxtApp()

  if (process.client && !ready.value && $supabase) {
    // 一次性初始化
    const init = async () => {
      // 标记初始化开始
      ready.value = false
      // 获取当前会话
      const { data: { session }, error } = await $supabase.auth.getSession()
      if (error) {
        console.error('useAuth: 获取初始会话失败', error)
      }
      user.value = session?.user ?? null
      // 标记已完成初始会话恢复
      ready.value = true
    }
    init()

    // 订阅后续状态变化
    authListener = $supabase.auth.onAuthStateChange((event, session: Session | null) => {
      if (event === 'INITIAL_SESSION') {
        ready.value = true
      }
      if (event === 'SIGNED_IN') {
        user.value = session?.user ?? null
      }
      if (event === 'SIGNED_OUT') {
        user.value = null
      }
    })
  }

  return {
    user: readonly(user),
    ready: readonly(ready),
  }
}


// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'
import { watch } from 'vue'

export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return

  const publicPages = ['/auth', '/law']
  const { user, ready } = useAuth()

  // 等待 Supabase 恢复初始会话
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

  // 未登录且非公开页面，跳转登录
  if (!user.value && !publicPages.includes(to.path)) {
    return navigateTo('/auth')
  }
})



