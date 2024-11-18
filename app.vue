<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';


const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  const isLoggedIn = authStore.checkAuth();
  
  if (isLoggedIn) {
    const phone = authStore.getCurrentPhone;
    console.log(`欢迎回来，${phone}`);
  }
});

// 监听路由变化，实现路由守卫
watch(() => router.currentRoute.value, (newRoute) => {
  const protectedRoutes = ['/protected', '/dashboard'];
  
  if (protectedRoutes.includes(newRoute.path) && !authStore.isLoggedIn) {
    router.push('/auth');
  }
}, { immediate: true });
</script>

<style>
/* 全局样式 */
</style>
  