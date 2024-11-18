<template>
  <div class="svg-container">
    <img src="/myheart.svg" alt="Heart Image" class="background-svg" />
  </div>
  <div class="auth-container">
    <h1>登录</h1>
    
    <!-- 登录方式切换 -->
    <div class="login-type-switch">
      <span 
        :class="{ active: loginType === 'password' }" 
        @click="loginType = 'password'"
      >密码登录</span>
      <span 
        :class="{ active: loginType === 'sms' }" 
        @click="loginType = 'sms'"
      >验证码登录</span>
    </div>

    <!-- 密码登录表单 -->
    <div v-if="loginType === 'password'" class="login-form">
      <input v-model="password" type="password" placeholder="输入密码" />
      <button @click="loginWithPassword">登录</button>
    </div>

    <!-- 验证码登录表单 -->
    <div v-if="loginType === 'sms'" class="login-form">
      <div class="phone-input">
        <input 
          v-model="phoneNumber" 
          type="text" 
          placeholder="输入手机号"
          maxlength="11"
        />
      </div>
      <div class="sms-input">
        <input 
          v-model="smsCode" 
          type="text" 
          placeholder="输入验证码"
          maxlength="6"
        />
        <button 
          @click="sendSmsCode" 
          :disabled="countdown > 0"
          class="sms-button"
        >
          {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
        </button>
      </div>
      <button @click="loginWithSms">登录</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

// 在这里定义API相关的常量
const BASE_URL = 'http://127.0.0.1:8000/asl/';
const API_KEY = '1234567890';
const SMS_SEND_URL = `${BASE_URL}sms/send/`;
const SMS_VERIFY_URL = `${BASE_URL}sms/verify/`;

const authStore = useAuthStore();
const router = useRouter();

// 登录相关状态
const loginType = ref('password');
const password = ref('');
const phoneNumber = ref('');
const smsCode = ref('');
const errorMessage = ref('');
const countdown = ref(0);

// 密码登录
const loginWithPassword = () => {
  console.log('尝试登录，密码:', password.value);

  if (!password.value) {
    errorMessage.value = '请输入密码';
    return;
  }

  const success = authStore.authenticate(password.value);
  console.log('认证结果:', success);

  if (success) {
    console.log('登录成功，准备跳转');
    // 如果有手机号，也保存手机号
    if (phoneNumber.value) {
      authStore.setAuthenticated(true, phoneNumber.value);
    } else {
      authStore.setAuthenticated(true);
    }
    errorMessage.value = '登录成功！';
    router.push('/');
  } else {
    console.log('登录失败，密码错误');
    errorMessage.value = '密码错误，请重试。';
  }
};

// 发送验证码
const sendSmsCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    errorMessage.value = '请输入正确的手机号';
    return;
  }

  try {
    const response = await fetch(SMS_SEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 1234567890,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber.value
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // 开始倒计时
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      errorMessage.value = '验证码发送成功！';
    } else {
      errorMessage.value = result.message || '发送验证码失败，请重试';
    }
  } catch (error) {
    console.error('发送验证码错误:', error);
    errorMessage.value = '发送验证码失败，请检查网络连接';
  }
};

// 验证码登录
const loginWithSms = async () => {
  if (!phoneNumber.value || !smsCode.value) {
    errorMessage.value = '请输入手机号和验证码';
    return;
  }

  try {
    const response = await fetch(SMS_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 1234567890,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber.value,
        code: smsCode.value
      })
    });

    const result = await response.json();

    if (result.success) {
      // 验证成功，设置登录状态并保存手机号
      await authStore.setAuthenticated(true, phoneNumber.value);
      errorMessage.value = '登录成功！';
      router.push('/'); // 跳转到首页
    } else {
      errorMessage.value = result.message || '验证码错误，请重试';
    }
  } catch (error) {
    console.error('验证码验证错误:', error);
    errorMessage.value = '登录失败，请重试';
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

.login-type-switch {
  margin: 20px 0;
  display: flex;
  gap: 20px;
}

.login-type-switch span {
  cursor: pointer;
  padding: 5px 10px;
  border-bottom: 2px solid transparent;
}

.login-type-switch span.active {
  border-bottom-color: #007bff;
  color: #007bff;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 300px;
}

input {
  margin-bottom: 15px;
  padding: 12px;
  font-size: 24px;
  width: 100%;
  box-sizing: border-box;
}

.phone-input {
  width: 100%;
}

.sms-input {
  display: flex;
  gap: 10px;
}

.sms-input input {
  flex: 1;
  margin-bottom: 0;
}

.sms-button {
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
}

button {
  padding: 15px 30px;
  font-size: 24px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>

