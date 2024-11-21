<template>
    <div class="container">
      <h1>Access Django Admin</h1>
      <p>Enter your API Key to access the admin panel:</p>
      <input
        type="text"
        v-model="apiKey"
        placeholder="Enter API Key"
        class="api-key-input"
      />
      <button @click="accessAdmin" class="access-button">Open Django Admin</button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const apiKey = ref(''); // 用户输入的 API Key
  const error = ref(''); // 用于显示错误信息
  
  const accessAdmin = async () => {
    // 检查用户是否输入了 API Key
    if (!apiKey.value) {
      error.value = 'Please enter your API Key.';
      return;
    }
  
    // 请求目标 URL
    const url = 'http://121.199.73.119:8080/admin';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey.value, // 将用户输入的 API Key 放入请求头
        },
        credentials: 'include', // 如果需要 Cookie，则启用这行
      });
  
      if (response.ok) {
        // 如果请求成功，重定向到 Django Admin 页面
        window.location.href = url;
      } else {
        // 如果请求失败，解析错误并显示
        const data = await response.json();
        error.value = data.detail || 'Access denied';
      }
    } catch (err) {
      error.value = `An error occurred: ${err.message}`;
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  .api-key-input {
    width: 80%;
    padding: 0.5rem;
    margin: 1rem 0;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  .access-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .access-button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>
  