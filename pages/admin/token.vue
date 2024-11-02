<template>
    <div class="admin-container">
      <h1>当前有效的动态 Token</h1>
      <div v-if="token">
        <p><strong>Token:</strong> {{ token }}</p>
        <p><strong>有效期至:</strong> {{ expirationDate }}</p>
      </div>
      <div v-else>
        <p>正在加载 Token...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const token = ref('');
  const expirationDate = ref('');
  
  onMounted(async () => {
    try {
      const response = await $fetch('/api/generate-token');
      token.value = response.token;
      expirationDate.value = response.expires;
    } catch (error) {
      console.error('无法获取 Token:', error);
    }
  });
  </script>
  
  <style scoped>
  .admin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  p {
    margin: 10px 0;
    font-size: 18px;
  }
  
  strong {
    font-weight: bold;
  }
  </style>
  