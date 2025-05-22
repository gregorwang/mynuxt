
import { ref, onUnmounted } from 'vue'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const user = ref<User | null>(null)
  
  // 只在客户端执行
  if (process.client) {
    const { $supabase } = useNuxtApp()
    
    // 初次检查
    $supabase.auth.getUser().then(({ data }) => {
      user.value = data.user
    })

    // 订阅状态变化
    const { data: listener } = $supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })

    onUnmounted(() => {
      listener?.subscription?.unsubscribe()
    })
  }

  return { user }
}


