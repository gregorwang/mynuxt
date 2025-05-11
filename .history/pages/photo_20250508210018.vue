<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <img src="~/assets/despair.jpg" alt="Background Image" class="hero-background-image" />
      <div class="gradient-overlay"></div>
      <div class="hero-text-content">
        <h1 class="main-title">
          <span class="title-main-text">光影瞬间</span> <!-- 您可以修改这里的标题 -->
          <span class="title-year">探索集</span>
        </h1>
        <p class="subtitle">
          每一个角落，都有不一样的故事与风景。
        </p>
      </div>
      <div class="curved-bottom"></div>
    </div>

    <!-- 添加导航栏 -->
    <nav class="photo-navigation">
      <NuxtLink to="/photo" exact-active-class="active-nav-link" class="nav-link">首页概览</NuxtLink>
      <NuxtLink to="/photo/landscapes" active-class="active-nav-link" class="nav-link">壮丽风景</NuxtLink>
      <NuxtLink to="/photo/portraits" active-class="active-nav-link" class="nav-link">人文纪实</NuxtLink>
      <NuxtLink to="/photo/cityscapes" active-class="active-nav-link" class="nav-link">都市掠影</NuxtLink>
      <NuxtLink to="/photo/cultural" active-class="active-nav-link" class="nav-link">文化探索</NuxtLink>
    </nav>

    <!-- 子页面内容显示区域 -->
    <div class="photo-content-area">
      <NuxtChild :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // 如果在 Nuxt 3 中使用，Nuxt 2 中通常不需要显式导入

const router = useRouter(); // Nuxt 3
// const router = useNuxtApp().$router; // 另一种 Nuxt 3 获取 router 的方式
// 在 Nuxt 2 中，可以直接使用 this.$router (在选项式 API 中) 或通过 context (在 setup 中)

function navigateToMoreInfo() {
  // 您可以根据需要修改此路由
  router.push('/more-info'); // 示例路由
}
</script>

<style scoped>
.page-container {
  background-color: #f0f2f5; /* Light background for the page below hero */
  overflow-x: hidden;
}

/* Hero Section Styles */
.hero-section {
  position: relative;
  width: 100vw;
  height: 70vh; /* 调整为之前的高度或您期望的高度 */
  overflow: hidden;
  background-color: #000; /* Fallback color */
}

.hero-background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.hero-text-content {
  position: absolute;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 90%;
  max-width: 1200px; 
}

.main-title {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin: 0;
  line-height: 1.1;
}

.title-main-text {
  display: block;
  font-size: clamp(2.5rem, 10vw, 8rem); 
  letter-spacing: -0.02em; 
}

.title-year {
  display: block;
  font-size: clamp(2rem, 8vw, 6rem); 
  font-weight: 200; 
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.subtitle {
  font-size: clamp(1rem, 2.5vw, 1.5rem); 
  font-weight: 300;
  letter-spacing: 0.02em;
  margin-top: 1.2rem;
  opacity: 0.85;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.curved-bottom {
  position: absolute;
  bottom: -1px; 
  left: 0;
  width: 100%;
  height: 80px; 
  background-color: #f0f2f5; /* Match page content background */
  border-top-left-radius: 50% 100%; 
  border-top-right-radius: 50% 100%; 
  transform: scaleX(1.5); 
  z-index: 1; /* Adjusted z-index as sub-nav is removed */
}

/* 导航栏样式 */
.photo-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  margin-bottom: 30px;
}

.nav-link {
  padding: 10px 20px;
  margin: 0 5px;
  color: #555;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #007bff;
}

.active-nav-link {
  color: #007bff;
  border-bottom-color: #007bff;
}

/* 子页面内容区域 */
.photo-content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 50px;
}

/* Content Section Styles (Restored) */
/* 注意：由于我们现在使用 NuxtChild 来显示子页面内容，
   原来的 content-section 相关样式可以移除或保留供其他用途 */

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }
  .curved-bottom {
    height: 50px; 
  }
  .photo-navigation {
    overflow-x: auto;
    justify-content: flex-start;
    padding: 15px 10px;
  }
  .nav-link {
    padding: 10px 15px;
    white-space: nowrap;
  }
}
</style>
  

