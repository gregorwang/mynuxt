<template>
  <client-only>
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

        <!-- 各种表单 -->
        <transition name="fade" mode="out-in">
          <!-- 邮箱登录 -->
          <div v-if="loginType === 'email'" class="login-form" key="email">
            <div class="input-group">
              <div class="input-icon"><i class="fas fa-envelope"></i></div>
              <input v-model="email" type="email" placeholder="输入邮箱" class="input-with-icon" />
            </div>
            <div class="input-group">
              <div class="input-icon"><i class="fas fa-lock"></i></div>
              <input v-model="password" type="password" placeholder="输入密码" class="input-with-icon" />
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

          <!-- 手机号登录 -->
          <div v-else-if="loginType === 'phone'" class="login-form" key="phone">
            <div class="input-group">
              <div class="input-icon"><i class="fas fa-mobile-alt"></i></div>
              <input v-model="phone" type="tel" placeholder="输入手机号" class="input-with-icon" maxlength="11" />
            </div>

            <div v-if="phoneLoginMethod === 'sms'" class="input-group sms-group">
              <div class="input-icon"><i class="fas fa-key"></i></div>
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

            <div v-else class="input-group">
              <div class="input-icon"><i class="fas fa-lock"></i></div>
              <input
                v-model="phonePassword"
                type="password"
                placeholder="输入密码"
                class="input-with-icon"
              />
            </div>

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

          <!-- 注册 -->
          <div v-else-if="loginType === 'register'" class="login-form" key="register">
            <div class="input-group">
              <div class="input-icon"><i class="fas fa-envelope"></i></div>
              <input v-model="email" type="email" placeholder="输入邮箱" class="input-with-icon" />
            </div>
            <div class="input-group">
              <div class="input-icon"><i class="fas fa-lock"></i></div>
              <input v-model="password" type="password" placeholder="输入密码" class="input-with-icon" />
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
          <a href="#" @click.prevent="loginType = loginType === 'register' ? 'email' : 'register'" class="link">
            {{ loginType === 'register' ? '已有账号？去登录' : '没有账号？去注册' }}
          </a>
        </div>
      </div>

      <!-- 底部备案 -->
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

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthLifecycle } from '~/composables/useAuthLifecycle';

const { $supabase } = useNuxtApp();
const router = useRouter();
const { user } = useAuthLifecycle();

// 状态
const loginType = ref<'email' | 'phone' | 'register'>('email');
const email = ref('');
const password = ref('');
const phone = ref('');
const phonePassword = ref('');
const smsCode = ref('');
const phoneLoginMethod = ref<'sms' | 'password'>('sms');
const errorMessage = ref('');
const isLoading = ref(false);
const isSendingCode = ref(false);
const countdown = ref(0);
let countdownTimer: number | null = null;

// …（其余方法与之前一致，省略以节省篇幅）
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

/* SVG 与容器 */
.svg-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  animation: fadeIn 1s ease-in-out;
}
.background-svg {
  width: 50vw;
  margin-bottom: 40px;
  transition: transform 0.5s ease;
}
.background-svg:hover {
  transform: scale(1.05);
}
/* 验证框 */
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
/* 标题 */
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
/* 切换 */
.login-type-switch {
  margin: 20px 0;
  display: flex;
  gap: 20px;
  justify-content: center;
}
.switch-item {
  cursor: pointer;
  padding: 8px 15px;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  transition: all 0.3s;
}
.switch-item.active {
  border-bottom-color: #007bff;
  color: #007bff;
  font-weight: 500;
}
/* 表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 350px;
}
.input-group {
  position: relative;
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
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s;
}
.input-with-icon:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  outline: none;
}
/* 短信按钮 */
.sms-group .sms-input {
  padding-right: 120px;
}
.send-code-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.send-code-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
/* 登录按钮 */
.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 30px;
  font-size: 18px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  transition: all 0.3s;
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
/* OAuth */
.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.oauth-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: #fff;
}
.oauth-button.google { background-color: #DB4437; }
.oauth-button.microsoft { background-color: #00a4ef; }
/* 错误提示 */
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
}
/* 链接 */
.additional-links {
  margin-top: 20px;
}
.link {
  color: #666;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}
.link:hover {
  color: #007bff;
  text-decoration: underline;
}
/* 底部备案 */
footer { z-index: 10; }

/* 动画 */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(0); }
  to { opacity: 1; transform: translateY(-50px); }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s, transform 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>



