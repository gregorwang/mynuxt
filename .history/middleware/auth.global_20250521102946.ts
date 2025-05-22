import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to) => {
  // 在服务器端渲染时跳过认证检查
  if (process.server) {
    console.log('全局中间件：服务器端渲染，跳过认证检查');
    return;
  }
  
  console.log(`全局中间件：处理路由 ${to.path}`);
  
  const { user } = useAuth();
  
  // 定义不需要认证的页面路径
  const publicPages = ['/auth', '/law'];
  // 改进路径匹配逻辑，使用startsWith检查前缀
  const isPublicPage = publicPages.some(page => to.path.startsWith(page));
  
  console.log(`全局中间件：当前路径 ${to.path}，是否公开页面: ${isPublicPage}，用户状态: ${user.value ? '已登录' : '未登录'}`);
  
  // 如果用户未认证且不在公开页面，重定向到登录页
  if (!user.value && !isPublicPage) {
    console.log('全局中间件：未认证，重定向到登录页');
    return navigateTo('/auth');
  } else if (user.value) {
    console.log(`全局中间件：用户已认证，用户邮箱: ${user.value.email}`);
  }
}