import { defineStore } from 'pinia';

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  timestamp: number | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    phoneNumber: null,
    timestamp: null,
  }),

  actions: {
    // 密码登录方法
    authenticate(password: string): boolean {
      if (password === 'woyouzui') {
        this.setAuthenticated(true);
        return true;
      }
      return false;
    },

    // 设置认证状态
    setAuthenticated(value: boolean, phoneNumber: string | null = null) {
      this.isAuthenticated = value;
      if (phoneNumber) {
        this.phoneNumber = phoneNumber;
      }
      
      // 保存到 localStorage
      if (value) {
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: value,
          phoneNumber: this.phoneNumber,
          timestamp: new Date().getTime()
        }));
      } else {
        localStorage.removeItem('auth');
      }
    },

    // 验证码登录方法
    async authenticateWithSms(phone: string, code: string): Promise<boolean> {
      try {
        const response = await fetch('http://localhost:5000/verify-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phone_number: phone, code: code })
        });
        
        const result = await response.json();
        
        if (result.success) {
          this.setAuthenticated(true, phone);
          return true;
        }
        return false;
      } catch (error) {
        console.error('SMS authentication failed:', error);
        return false;
      }
    },

    // 检查登录状态
    checkAuth(): boolean {
      const authData = localStorage.getItem('auth');
      if (!authData) return false;

      try {
        const { isAuthenticated, phoneNumber, timestamp } = JSON.parse(authData);
        const now = new Date().getTime();
        
        // 检查是否在24小时内
        if (isAuthenticated && (now - timestamp) < 24 * 60 * 60 * 1000) {
          this.isAuthenticated = true;
          this.phoneNumber = phoneNumber;
          this.timestamp = timestamp;
          return true;
        } else {
          this.logout(); // 登录过期，清除状态
          return false;
        }
      } catch {
        return false;
      }
    },

    // 登出方法
    logout() {
      this.isAuthenticated = false;
      this.phoneNumber = null;
      this.timestamp = null;
      localStorage.removeItem('auth');
    }
  },

  getters: {
    // 获取当前登录的手机号
    getCurrentPhone: (state): string | null => state.phoneNumber,
    
    // 检查是否已登录
    isLoggedIn: (state): boolean => state.isAuthenticated
  }
});
