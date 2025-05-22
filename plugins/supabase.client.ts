// ~/plugins/supabase.client.ts
import { defineNuxtPlugin } from '#app'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // 添加调试日志
  console.log('初始化Supabase客户端，URL:', config.public.supabaseUrl)
  
  // 确保URL和密钥存在
  if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
    console.error('Supabase配置缺失，URL或密钥未定义')
    throw new Error('Supabase配置缺失')
  }
  
  // 创建Supabase客户端，添加持久化会话支持
  const supabase: SupabaseClient = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey,
    {
      auth: {
        storageKey: 'supabase-auth-token',
        persistSession: true,
        autoRefreshToken: true
      }
    }
  )
  
  // 注入到全局，这样组件里就可以用 useNuxtApp().$supabase 拿到
  nuxtApp.provide('supabase', supabase)
  
  // 在客户端初始化时检查并记录认证状态
  if (process.client) {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('获取Supabase会话失败:', error)
      } else {
        console.log('Supabase插件初始化时的会话状态:', data.session ? '有效会话' : '无会话')
      }
    })
  }
})
