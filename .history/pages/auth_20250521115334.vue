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
          :class="{ active: loginType === 'email' }" 
          @click="loginType = 'email'"
          class="switch-item"
        >邮箱登录</span>
        <span 
          :class="{ active: loginType === 'phone' }" 
          @click="loginType = 'phone'"
          class="switch-item"
        >手机号登录</span>
        <span 
          :class="{ active: loginType === 'register' }" 
          @click="loginType = 'register'"
          class="switch-item"
        >邮箱注册</span>
      </div>

      <!-- 邮箱登录表单 -->
      <transition name="fade" mode="out-in">
        <div v-if="loginType === 'email'" class="login-form" key="email">
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="输入邮箱"
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
          <button @click="signIn" class="login-button">
            <span class="button-text">登录</span>
            <span class="button-icon" v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
          </button>
          
          <div class="oauth-buttons">
            <button @click="signInWithGoogle" class="oauth-button google">
              <i class="fab fa-google"></i> Google 登录
            </button>
            <button @click="signInWithMicrosoft" class="oauth-button microsoft">
              <i class="fab fa-microsoft"></i> Microsoft 登录
            </button>
          </div>
        </div>
        
        <!-- 手机号登录表单 -->
        <div v-else-if="loginType === 'phone'" class="login-form" key="phone">
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <input 
              v-model="phone" 
              type="tel" 
              placeholder="输入手机号"
              class="input-with-icon"
              maxlength="11"
            />
          </div>
          
          <!-- 验证码登录 -->
          <div v-if="phoneLoginMethod === 'sms'" class="input-group sms-group">
            <div class="input-icon">
              <i class="fas fa-key"></i>
            </div>
            <input 
              v-model="smsCode" 
              type="text" 
              placeholder="输入验证码" 
              class="input-with-icon sms-input"
              maxlength="6"
            />
            <button 
              @click="sendSmsCode" 
              class="send-code-btn" 
              :disabled="isSendingCode || countdown > 0"
            >
              {{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}
            </button>
          </div>
          
          <!-- 密码登录 -->
          <div v-else class="input-group">
            <div class="input-icon">
              <i class="fas fa-lock"></i>
            </div>
            <input 
              v-model="phonePassword" 
              type="password" 
              placeholder="输入密码" 
              class="input-with-icon"
            />
          </div>
          
          <!-- 登录方式切换 -->
          <div class="phone-login-switch">
            <a href="#" @click.prevent="phoneLoginMethod = phoneLoginMethod === 'sms' ? 'password' : 'sms'" class="link">
              {{ phoneLoginMethod === 'sms' ? '使用密码登录' : '使用验证码登录' }}
            </a>
          </div>
          
          <button @click="signInWithPhone" class="login-button">
            <span class="button-text">登录</span>
            <span class="button-icon" v-if="isLoading"><i class="fas fa-spinner fa-spin"></i></span>
          </button>
        </div>

        <!-- 注册表单 -->
        <div v-else-if="loginType === 'register'" class="login-form" key="register">
          <div class="input-group">
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="输入邮箱"
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
          <button @click="signUp" class="login-button">
            <span class="button-text">注册</span>
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
        <a href="#" @click.prevent="loginType = loginType === 'password' ? 'register' : 'password'" class="link">
          {{ loginType === 'password' ? '没有账号？去注册' : '已有账号？去登录' }}
        </a>
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

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthLifecycle } from '~/composables/useAuthLifecycle';

const { $supabase } = useNuxtApp();
const router = useRouter();
const { user } = useAuthLifecycle();

// 登录相关状态
const loginType = ref('email');
const email = ref('');
const password = ref('');
const phone = ref('');
const phonePassword = ref('');
const smsCode = ref('');
const phoneLoginMethod = ref('sms'); // 'sms' 或 'password'
const errorMessage = ref('');
const isLoading = ref(false);
const isSendingCode = ref(false);
const countdown = ref(0);
let countdownTimer: number | null = null;

// 邮箱注册
async function signUp() {
  if (!email.value || !password.value) {
    showError('请输入邮箱和密码');
    return;
  }
  
  try {
    isLoading.value = true;
    const { error } = await $supabase.auth.signUp({ 
      email: email.value, 
      password: password.value 
    });
    
    if (error) {
      showError('注册失败：' + error.message);
    } else {
      showSuccess('注册成功，请检查邮箱激活！');
    }
  } catch (error) {
    console.error('注册错误:', error);
    showError('注册失败，请重试');
  } finally {
    isLoading.value = false;
  }
}

// 邮箱登录
async function signIn() {
  if (!email.value || !password.value) {
    showError('请输入邮箱和密码');
    return;
  }
  
  try {
    console.log('开始邮箱登录流程', email.value);
    isLoading.value = true;
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    
    if (error) {
      console.error('登录API返回错误:', error);
      showError('登录失败：' + error.message);
    } else {
      console.log('登录成功，用户信息:', data.user);
      // 确保用户状态已更新
      const { user: currentUser } = useAuthLifecycle();
      console.log('登录后检查用户状态:', currentUser.value ? '已登录' : '未登录');
      
      showSuccess('登录成功！');
      setTimeout(() => {
        console.log('准备导航到首页');
        router.push('/');
      }, 1000);
    }
  } catch (error) {
    console.error('登录错误:', error);
    showError('登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
}

// Google OAuth
async function signInWithGoogle() {
  try {
    isLoading.value = true;
    const { error } = await $supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    
    if (error) {
      showError('Google 登录出错：' + error.message);
    }
  } catch (error) {
    console.error('Google 登录错误:', error);
    showError('Google 登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
}

// Microsoft OAuth
async function signInWithMicrosoft() {
  try {
    isLoading.value = true;
    const { error } = await $supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: { redirectTo: window.location.origin }
    });
    
    if (error) {
      showError('Microsoft 登录出错：' + error.message);
    }
  } catch (error) {
    console.error('Microsoft 登录错误:', error);
    showError('Microsoft 登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
}

// 错误/成功消息的DOM引用
let errorMessageElement: Element | null = null;

// 显示错误信息
const showError = (message) => {
  errorMessage.value = message;
  if (process.client && errorMessageElement) {
    errorMessageElement.classList.remove('success');
  }
  setTimeout(() => {
    errorMessage.value = '';
  }, 3000);
};

// 显示成功信息
const showSuccess = (message) => {
  errorMessage.value = message;
  // 修改样式为成功样式
  if (process.client && errorMessageElement) {
    errorMessageElement.classList.add('success');
  }
  setTimeout(() => {
    errorMessage.value = '';
    if (process.client && errorMessageElement) {
      errorMessageElement.classList.remove('success');
    }
  }, 3000);
};

// 发送短信验证码
async function sendSmsCode() {
  if (!phone.value || phone.value.length !== 11) {
    showError('请输入正确的手机号');
    return;
  }
  
  try {
    isSendingCode.value = true;
    const response = await fetch('/api/auth/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: phone.value })
    });
    
    const result = await response.json();
    
    if (result.success) {
      showSuccess('验证码已发送');
      startCountdown();
    } else {
      showError('发送验证码失败：' + (result.error || '未知错误'));
    }
  } catch (error) {
    console.error('发送验证码错误:', error);
    showError('发送验证码失败，请重试');
  } finally {
    isSendingCode.value = false;
  }
}

// 手机号登录
async function signInWithPhone() {
  if (!phone.value || phone.value.length !== 11) {
    showError('请输入正确的手机号');
    return;
  }
  
  try {
    isLoading.value = true;
    
    if (phoneLoginMethod.value === 'sms') {
      // 验证码登录
      if (!smsCode.value) {
        showError('请输入验证码');
        isLoading.value = false;
        return;
      }
      
      // 使用Supabase的手机验证码登录
      const { error } = await $supabase.auth.verifyOtp({
        phone: phone.value,
        token: smsCode.value,
        type: 'sms'
      });
      
      if (error) {
        showError('验证码错误或已过期：' + error.message);
        return;
      }
    } else {
      // 密码登录
      if (!phonePassword.value) {
        showError('请输入密码');
        isLoading.value = false;
        return;
      }
      
      // 使用Supabase的密码登录
      const { error } = await $supabase.auth.signInWithPassword({
        phone: phone.value,
        password: phonePassword.value
      });
      
      if (error) {
        showError('手机号或密码错误：' + error.message);
        return;
      }
    }
    
    showSuccess('登录成功！');
    // 使用useRouter进行导航，并确保在客户端执行
    setTimeout(() => {
      if (process.client) {
        router.push('/');
      }
    }, 1000);
  } catch (error) {
    console.error('手机号登录错误:', error);
    showError('登录失败，请重试');
  } finally {
    isLoading.value = false;
  }
}

// 开始倒计时
function startCountdown() {
  countdown.value = 60;
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }
  }, 1000) as unknown as number;
}

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  
  // 移除键盘事件监听
  if (process.client) {
    document.removeEventListener('keydown', handleKeyDown);
  }
});

// 组件挂载时添加键盘事件监听
onMounted(() => {
  // 仅在客户端执行DOM操作
  if (process.client) {
    document.addEventListener('keydown', handleKeyDown);
    // 初始化错误/成功消息的DOM引用
    errorMessageElement = document.querySelector('.error');
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    if (loginType.value === 'email') {
      signIn();
    } else if (loginType.value === 'phone') {
      signInWithPhone();
    } else if (loginType.value === 'register') {
      signUp();
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
  gap: 20px;
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

.sms-group {
  position: relative;
}

.sms-input {
  padding-right: 120px;
}

.send-code-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-code-btn:hover {
  background-color: #0069d9;
}

.send-code-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.phone-login-switch {
  margin-top: 5px;
  margin-bottom: 15px;
  text-align: right;
  width: 100%;
}
.input-with-icon:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  outline: none;
}
.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.oauth-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  color: white;
}
.oauth-button.google {
  background-color: #DB4437;
}
.oauth-button.microsoft {
  background-color: #00a4ef;
}
.oauth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.oauth-button:active {
  transform: translateY(0);
  box-shadow: none;
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



<template>
  <client-only>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md mt-10">
        <h2 class="text-2xl font-bold mb-6 text-center">{{ loginType === 'password' ? '登录' : '注册' }}</h2>
        <form @submit.prevent="loginType === 'password' ? signIn() : signUp()">
          <!-- 表单内容省略 -->
        </form>
        <div class="mt-4 text-center">
          <a href="#" @click.prevent="loginType = loginType === 'password' ? 'register' : 'password'" class="link">
            {{ loginType === 'password' ? '没有账号？去注册' : '已有账号？去登录' }}
          </a>
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
  </client-only>
</template>

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
/style>


