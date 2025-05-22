import { onUnmounted } from 'vue'
import { useAuth } from './useAuth'

export function useAuthLifecycle() {
  const { user, listener } = useAuth()
  
  // 在组件卸载时取消订阅
  onUnmounted(() => {
    listener?.subscription?.unsubscribe()
  })

  return { user }
}
