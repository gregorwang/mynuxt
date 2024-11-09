<template>
  <NuxtPage />
</template>

<script setup>
  if (process.client) {
    // 仅在客户端运行
    const gtagScript = document.createElement("script");
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    // 添加配置代码
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
  }
</script>

  