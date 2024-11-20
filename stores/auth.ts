import { defineStore } from 'pinia';

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  timestamp: number | null;
}

// API配置
const BASE_URL = 'http://127.0.0.1:8000/asl/';
const API_KEY = '1234567890';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    phoneNumber: null,
    timestamp: null,
  }),

  actions: {
    // 验证码登录方法
    async authenticateWithSms(phone: string, code: string): Promise<boolean> {
      try {
        const response = await fetch(`${BASE_URL}sms/verify/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ 
            phone_number: phone, 
            code: code 
          })
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

    // 设置认证状态
    setAuthenticated(value: boolean, phoneNumber: string | null = null) {
      console.log('Setting authenticated:', { value, phoneNumber });
      this.isAuthenticated = value;
      this.phoneNumber = phoneNumber;
      this.timestamp = value ? new Date().getTime() : null;
      
      if (value && phoneNumber) {
        const authData = {
          isAuthenticated: value,
          phoneNumber: phoneNumber,
          timestamp: this.timestamp
        };
        console.log('Saving to localStorage:', authData);
        localStorage.setItem('auth', JSON.stringify(authData));
      } else {
        localStorage.removeItem('auth');
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
        if (isAuthenticated && phoneNumber && (now - timestamp) < 24 * 60 * 60 * 1000) {
          this.isAuthenticated = true;
          this.phoneNumber = phoneNumber;
          this.timestamp = timestamp;
          return true;
        } else {
          this.logout();
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
    getCurrentPhone: (state): string | null => state.phoneNumber,
    isLoggedIn: (state): boolean => state.isAuthenticated
  }
});
