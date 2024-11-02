<template>
  <div class="svg-container">
    <img src="/myheart.svg" alt="Heart Image" class="background-svg" />
  </div>
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
.svg-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.background-svg {
  width: 50vw;
  height: auto;
  margin-bottom: 40px;
}

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translateY(-50px);
  height: calc(100vh - 300px);
}

input {
  margin-bottom: 15px;
  padding: 12px;
  font-size: 24px;
}

button {
  padding: 15px 30px;
  font-size: 24px;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>
