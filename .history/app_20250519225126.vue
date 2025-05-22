<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';


const router = useRouter();
const { user } = useAuth();

onMounted(() => {
  if (user.value) {
    console.log(`欢迎回来，${user.value.email}`);
  }
});

// 监听路由变化，实现路由守卫
watch(() => router.currentRoute.value, (newRoute) => {
  const protectedRoutes = ['/protected', '/dashboard'];
  
  if (protectedRoutes.includes(newRoute.path) && !user.value) {
    router.push('/auth');
  }
}, { immediate: true });
</script>

<style>
/* 全局样式 */
</style>
  