import { useAuthStore } from '~/stores/auth';
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  // 在服务器端渲染时跳过认证检查
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // 定义不需要认证的页面路径
  const publicPages = ['/auth', '/law'];
  const isPublicPage = publicPages.includes(to.path);
  
  // 如果用户未认证且不在公开页面，重定向到登录页
  if (!authStore.isAuthenticated && !isPublicPage) {
    return navigateTo('/auth');
  }
});