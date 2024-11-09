// plugins/google-analytics.client.js
export default defineNuxtPlugin((nuxtApp) => {
    if (process.env.NODE_ENV === "production") {
      // 插入 Gtag.js 脚本
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`;
      gtagScript.async = true;
      document.head.appendChild(gtagScript);
  
      // 配置 Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", process.env.GOOGLE_ANALYTICS_ID);
    }
  });
  