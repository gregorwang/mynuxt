
import { ref } from 'vue'
import type { User, RealtimeSubscription } from '@supabase/supabase-js'

export function useAuth() {
  const user = ref<User | null>(null)
  let listener: { subscription?: RealtimeSubscription } | undefined
  
  // 使用ref初始化，确保SSR和客户端初始渲染一致
  const { $supabase } = useNuxtApp()
  
  // 添加调试日志
  console.log('useAuth 被调用，初始化认证状态')
  
  // 使用nuxt的useAsyncData确保服务端和客户端数据一致
  useAsyncData('auth-user', async () => {
    if (process.client) {
      console.log('useAuth: 客户端环境，开始获取用户信息')
      // 初次检查
      const { data, error } = await $supabase.auth.getUser()
      
      if (error) {
        console.error('useAuth: 获取用户信息失败', error)
      } else {
        console.log('useAuth: 获取到用户信息', data.user ? '已登录' : '未登录')
        user.value = data.user
      }
      
      // 订阅状态变化 - 仅在客户端
      console.log('useAuth: 设置认证状态监听器')
      const authListener = $supabase.auth.onAuthStateChange((_event, session) => {
        console.log(`useAuth: 认证状态变化事件: ${_event}`, session ? '有会话' : '无会话')
        user.value = session?.user ?? null
      })
      
      listener = authListener.data
    }
    return { user }
  })
  
  // 添加调试日志，显示当前用户状态
  console.log('useAuth: 当前用户状态', user.value ? '已登录' : '未登录')

  return { user, listener }
}


