import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // 在服务器端渲染时跳过认证检查
  if (process.server) return;
  
  const authStore = useAuthStore();
  
  // 检查认证状态
  const isAuthenticated = authStore.checkAuth();
  
  // 定义不需要认证的页面路径
  const publicPages = ['/auth', '/law'];
  const isPublicPage = publicPages.includes(to.path);
  
  // 如果用户未认证且不在公开页面，重定向到登录页
  if (!isAuthenticated && !isPublicPage) {
    return navigateTo('/auth');
  }
};