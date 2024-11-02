<template>
    <div class="auth-container">
      <h1>请输入密码</h1>
      <input v-model="password" type="password" placeholder="输入密码" />
      <button @click="login">登录</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { useRouter } from 'vue-router';
  
  const authStore = useAuthStore();
  const router = useRouter();
  const password = ref('');
  const errorMessage = ref('');
  
  const login = () => {
    authStore.authenticate(password.value);
    if (authStore.isAuthenticated) {
      router.push('/');
    } else {
      errorMessage.value = '密码错误，请重试。';
    }
  };
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  