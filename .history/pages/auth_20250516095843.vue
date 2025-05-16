<template>
  <div>
    <div class="svg-container">
      <img src="/myheart.svg" alt="Heart Image" class="background-svg" />
    </div>
    <div class="auth-container">
      <h1 class="title">登录</h1>
      
      <!-- 登录方式切换 -->
      <div class="login-type-switch">
        <span 
          :class="{ active: loginType === 'password' }" 
          @click="loginType = 'password'"
          class="switch-item"
        >密码登录</span>
        <span 
          :class="{ active: loginType === 'sms' }" 
          @click="loginType = 'sms'"
          class="switch-item"
        >验证码登录</span>
      </div>

      <!-- 密码登录表单 -->
      <transition name="fade" mode="out-in">
        <div v-if="loginType === 'password'" class="login-form" key="password">
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <input 
              v-model="phoneNumber" 
              type="text" 
              placeholder="输入手机号"
              maxlength="11"
              class="input-with-icon"
            />
          </div>
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-lock"></i>
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="输入密码" 
              class="input-with-icon"
            />
          </div>
          <button @click="loginWithPassword" class="login-button">
            <span class="button-text">登录</span>
            <span class="button-icon" v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
          </button>
        </div>

        <!-- 验证码登录表单 -->
        <div v-else-if="loginType === 'sms'" class="login-form" key="sms">
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <input 
              v-model="phoneNumber" 
              type="text" 
              placeholder="输入手机号"
              maxlength="11"
              class="input-with-icon"
            />
          </div>
          <div class="input-group sms-input">
            <div class="input-icon">
              <i class="fas fa-key"></i>
            </div>
            <input 
              v-model="smsCode" 
              type="text" 
              placeholder="输入验证码"
              maxlength="6"
              class="input-with-icon"
            />
            <button 
              @click="sendSmsCode" 
              :disabled="countdown > 0"
              class="sms-button"
              :class="{ 'button-disabled': countdown > 0 }"
            >
              {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
            </button>
          </div>
          <button @click="loginWithSms" class="login-button">
            <span class="button-text">登录</span>
            <span class="button-icon" v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
          </button>
        </div>
      </transition>

      <transition name="fade">
        <p v-if="errorMessage" class="error">
          <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
        </p>
      </transition>
      
      <div class="additional-links">
        <a href="#" class="link">忘记密码</a>
        <a href="#" class="link">注册账号</a>
      </div>
    </div>
    
    <footer class="fixed bottom-0 w-full bg-gray-100 py-2 text-center text-xs text-gray-600">
      <div class="container mx-auto flex justify-center items-center space-x-4">
        <a href="/law" class="hover:text-blue-500 transition-colors">法律声明</a>
        <span>|</span>
        <a href="http://beian.miit.gov.cn/" target="_blank" class="hover:text-blue-500 transition-colors">鄂ICP备2025114987号</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

// 在这里定义API相关的常量
const BASE_URL = 'http://121.199.73.119/asl/';
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
const isLoading = ref(false);
let countdownTimer = null;

// 密码登录
const loginWithPassword = async () => {
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    showError('请输入正确的手机号');
    return;
  }
  if (!password.value) {
    showError('请输入密码');
    return;
  }
  try {
    isLoading.value = true;
    const success = await authStore.authenticateWithPassword(phoneNumber.value, password.value);
    if (success) {
      showSuccess('登录成功！');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      showError('密码错误，请重试。');
    }
  } catch (error) {
    console.error('登录错误:', error);
    showError('登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

// 发送验证码
const sendSmsCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    showError('请输入正确的手机号');
    return;
  }
  try {
    isLoading.value = true;
    const response = await fetch(SMS_SEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
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
      countdownTimer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
      showSuccess('验证码发送成功！');
    } else {
      showError(result.message || '发送验证码失败，请重试');
    }
  } catch (error) {
    console.error('发送验证码错误:', error);
    showError('发送验证码失败，请检查网络连接');
  } finally {
    isLoading.value = false;
  }
};

// 验证码登录
const loginWithSms = async () => {
  if (!phoneNumber.value || !smsCode.value) {
    showError('请输入手机号和验证码');
    return;
  }
  try {
    isLoading.value = true;
    const response = await fetch(SMS_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber.value,
        code: smsCode.value
      })
    });
    const result = await response.json();
    if (result.success) {
      await authStore.setAuthenticated(true, phoneNumber.value);
      showSuccess('登录成功！');
      setTimeout(() => {
        router.push('/'); // 跳转到首页
      }, 1000);
    } else {
      showError(result.message || '验证码错误，请重试');
    }
  } catch (error) {
    console.error('验证码验证错误:', error);
    showError('登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

// 显示错误信息
const showError = (message) => {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000);
};

// 显示成功信息
const showSuccess = (message) => {
  errorMessage.value = message;
  // 修改样式为成功样式
  document.querySelector('.error')?.classList.add('success');
  setTimeout(() => {
    errorMessage.value = '';
    document.querySelector('.error')?.classList.remove('success');
  }, 3000);
};

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});

// 组件挂载时添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (loginType.value === 'password') {
      loginWithPassword();
    } else {
      loginWithSms();
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.svg-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  animation: fadeIn 1s ease-in-out;
}
.background-svg {
  width: 50vw;
  height: auto;
  margin-bottom: 40px;
  transition: transform 0.5s ease;
}
.background-svg:hover {
  transform: scale(1.05);
}
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transform: translateY(-50px);
  height: calc(100vh - 300px);
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.8s ease-out;
}
.title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  position: relative;
}
.title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #007bff;
  border-radius: 3px;
}
.login-type-switch {
  margin: 20px 0;
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: center;
}
.switch-item {
  cursor: pointer;
  padding: 8px 15px;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
}
.switch-item:hover {
  color: #007bff;
}
.switch-item.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: 500;
}
.switch-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
  animation: slideIn 0.3s ease-out;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 350px;
}
.input-group {
  position: relative;
  width: 100%;
}
.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
}
.input-with-icon {
  padding: 12px 12px 12px 40px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 0;
}
.input-with-icon:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  outline: none;
}
.sms-input {
  display: flex;
  gap: 10px;
}
.sms-input .input-with-icon {
  flex: 1;
}
.sms-button {
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  height: 44px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.sms-button:not(.button-disabled):hover {
  background-color: #e0e0e0;
}
.button-disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
.login-button {
  padding: 14px 30px;
  font-size: 18px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.login-button:hover {
  background-color: #0069d9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.login-button:active {
  transform: translateY(0);
  box-shadow: none;
}
.button-text {
  transition: all 0.3s ease;
}
.button-icon {
  margin-left: 8px;
}
.error {
  color: #e74c3c;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
}
.error.success {
  color: #27ae60;
  background-color: rgba(39, 174, 96, 0.1);
}
.additional-links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 350px;
}
.link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}
.link:hover {
  color: #007bff;
  text-decoration: underline;
}
/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(0);
  }
  to { 
    opacity: 1;
    transform: translateY(-50px);
  }
}
@keyframes slideIn {
  from { width: 0; }
  to { width: 100%; }
}
/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>


