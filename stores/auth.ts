import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    authenticate(password: string) {
      if (password === 'woyouzui') {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
    logout() {
      this.isAuthenticated = false;
    },
    async authenticateWithSms(phone: string, code: string) {
      try {
        const response = await fetch('/api/auth/sms/verify', {
          method: 'POST',
          body: JSON.stringify({ phone, code })
        });
        const result = await response.json();
        
        if (result.success) {
          this.isAuthenticated = true;
          return true;
        }
        return false;
      } catch (error) {
        console.error('SMS authentication failed:', error);
        return false;
      }
    }
  },
});
