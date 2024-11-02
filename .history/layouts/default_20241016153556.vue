<template>
    <div>
      <NuxtLayout />
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '~/stores/auth';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  
  const authStore = useAuthStore();
  const router = useRouter();
  
  onMounted(() => {
    if (!authStore.isAuthenticated && router.currentRoute.value.path !== '/auth') {
      router.push('/auth');
    }
  });
  </script>
  