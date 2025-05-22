
import { ref } from 'vue'
import type { User, RealtimeSubscription } from '@supabase/supabase-js'

export function useAuth() {
  const user = ref<User | null>(null)
  let listener: { subscription?: RealtimeSubscription } | undefined
  
  // 只在客户端执行
  if (process.client) {
    const { $supabase } = useNuxtApp()
    
    // 初次检查
    $supabase.auth.getUser().then(({ data }) => {
      user.value = data.user
    })

    // 订阅状态变化
    const authListener = $supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
    
    listener = authListener.data
  }

  return { user, listener }
}


