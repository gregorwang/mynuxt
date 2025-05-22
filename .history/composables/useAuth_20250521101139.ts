
import { ref } from 'vue'
import type { User, RealtimeSubscription } from '@supabase/supabase-js'

export function useAuth() {
  const user = ref<User | null>(null)
  let listener: { subscription?: RealtimeSubscription } | undefined
  
    // 使用ref初始化，确保SSR和客户端初始渲染一致
  const { $supabase } = useNuxtApp()
  
  // 使用nuxt的useAsyncData确保服务端和客户端数据一致
  useAsyncData('auth-user', async () => {
    if (process.client) {
      // 初次检查
      const { data } = await $supabase.auth.getUser()
      user.value = data.user
      
      // 订阅状态变化 - 仅在客户端
      const authListener = $supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user ?? null
      })
      
      listener = authListener.data
    }
    return { user }
  })

  return { user, listener }
}


