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
    }
  },
});
