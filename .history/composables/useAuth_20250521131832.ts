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
      // 获取当前会话
      const { data: { session }, error } = await $supabase.auth.getSession()
      if (error) {
        console.error('useAuth: 获取初始会话失败', error)
      }
      user.value = session?.user ?? null
      ready.value = true
    }
    init()

    // 监听后续状态变化
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




