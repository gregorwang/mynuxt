import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.updateTheme();
    },
    setDarkMode(value: boolean) {
      this.darkMode = value;
      this.updateTheme();
    },
    updateTheme() {
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    },
  },
  persist: true, // 如果你希望在页面刷新后保持主题状态，可以使用持久化插件
});
