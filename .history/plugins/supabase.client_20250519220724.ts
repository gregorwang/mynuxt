// ~/plugins/supabase.client.ts
import { defineNuxtPlugin } from '#app'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const supabase: SupabaseClient = createClient(
    config.public.supabaseUrl,
    config.public.supabaseAnonKey
  )
  // 注入到全局，这样组件里就可以用 useNuxtApp().$supabase 拿到
  nuxtApp.provide('supabase', supabase)
})
