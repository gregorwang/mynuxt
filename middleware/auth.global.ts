import { useAuthStore } from '~/stores/auth';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  // 在服务器端渲染时跳过认证检查
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // 如果用户未认证且不在登录页面，重定向到登录页
  if (!authStore.isAuthenticated && to.path !== '/auth') {
    return navigateTo('/auth');
  }
}); 