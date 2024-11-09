<template>
  <nav class="nav-bar">
    <NuxtLink to="/">首页</NuxtLink>
    <div v-if="authStore.isLoggedIn" class="user-info">
      <span>{{ authStore.getCurrentPhone }}</span>
      <button @click="logout">退出登录</button>
    </div>
    <NuxtLink v-else to="/auth">登录</NuxtLink>
  </nav>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/auth');
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
}

.user-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 