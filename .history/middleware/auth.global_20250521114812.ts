import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to) => {
  // 只在客户端做认证检查，SSR 阶段直接跳过
  if (process.server) return;
  if (!process.client) return;
  const { user } = useAuth();
  // 定义不需要认证的页面路径
  const publicPages = ['/auth', '/law'];
  const isPublicPage = publicPages.includes(to.path);
  // 如果用户未认证且不在公开页面，重定向到登录页
  if (!user.value && !isPublicPage) {
    console.log('全局中间件：未认证，重定向到登录页');
    return navigateTo('/auth');
  }
  // 如果用户已认证，记录用户信息
  if (user.value) {
    console.log(`全局中间件：用户已认证，用户邮箱: ${user.value.email}`);
  }
});