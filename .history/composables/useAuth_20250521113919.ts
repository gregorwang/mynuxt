
import { ref } from 'vue'
import type { User } from '@supabase/supabase-js'
import { useNuxtApp } from '#app'

const user = ref<User | null>(null) // Singleton user ref
let listener: any // 或直接 let listener;
let isInitialized = false // Flag to ensure one-time initialization

export function useAuth() {
  const { $supabase } = useNuxtApp()

  // Initialize only once on the client when $supabase is available
  if (process.client && !isInitialized && $supabase) {
    isInitialized = true
    console.log('useAuth: 首次客户端初始化开始')

    // Initial fetch of user
    $supabase.auth.getUser()
      .then(({ data, error }) => {
        if (error) {
          console.error('useAuth: 初始化获取用户信息失败', error)
        } else {
          const userEmail = data.user?.email ?? '未登录';
          console.log('useAuth: 初始化获取到用户信息', userEmail)
          user.value = data.user
        }
      })
      .catch(error => {
        console.error('useAuth: 初始化获取用户信息异常', error)
      })

    // Subscribe to auth state changes
    console.log('useAuth: 设置认证状态监听器')
    const authListener = $supabase.auth.onAuthStateChange((event, session) => {
      const userEmail = session?.user?.email ?? '无会话';
      console.log(`useAuth: 认证状态变化事件: ${event}`, session ? `用户: ${userEmail}` : '无会话')
      user.value = session?.user ?? null
    })
    listener = authListener.data // Store the subscription data
  } else if (process.client && !$supabase && !isInitialized) {
    console.warn('useAuth: $supabase 尚未准备好，认证初始化将延迟。');
  }


  // Log current state when useAuth is called
  if (process.client) {
    const userEmail = user.value?.email ?? '未登录';
    console.log('useAuth 被调用，当前用户状态:', userEmail);
  } else {
    console.log('useAuth 被调用 (SSR)，用户状态初始为 null');
  }

  return { user, listener }
}


