import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  // 使用Supabase认证系统
  const { user } = useAuth();
  if (!user.value && to.path !== '/auth') {
    return navigateTo('/auth');
  }
});
