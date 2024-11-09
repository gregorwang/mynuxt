import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    phoneNumber: null,
  }),
  
  actions: {
    async setAuthenticated(value, phoneNumber = null) {
      this.isAuthenticated = value;
      if (phoneNumber) {
        this.phoneNumber = phoneNumber;
        // 可以将登录状态保存到 localStorage
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: value,
          phoneNumber: phoneNumber,
          timestamp: new Date().getTime()
        }));
      }
    },

    // 密码登录方法
    authenticate(password) {
      // 这里是密码验证逻辑
      if (password === 'your-password') { // 替换为您的密码验证逻辑
        this.setAuthenticated(true);
        return true;
      }
      return false;
    },

    // 检查登录状态
    checkAuth() {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const { isAuthenticated, phoneNumber, timestamp } = JSON.parse(auth);
        // 检查登录是否在24小时内
        if (isAuthenticated && (new Date().getTime() - timestamp) < 24 * 60 * 60 * 1000) {
          this.isAuthenticated = true;
          this.phoneNumber = phoneNumber;
          return true;
        }
      }
      return false;
    },

    // 登出方法
    logout() {
      this.isAuthenticated = false;
      this.phoneNumber = null;
      this.user = null;
      localStorage.removeItem('auth');
    }
  },

  getters: {
    // 获取当前登录的手机号
    getCurrentPhone: (state) => state.phoneNumber,
    
    // 检查是否已登录
    isLoggedIn: (state) => state.isAuthenticated
  }
}); 