<template>
  <div class="page-container">
    <!-- Hero Section (保持不变) -->
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

    <!-- 子导航栏 -->
    <nav class="sub-navigation">
      <NuxtLink to="/photo" exact-active-class="active-link" class="sub-nav-item">首页概览</NuxtLink>
      <NuxtLink to="/photo/landscapes" active-class="active-link" class="sub-nav-item">壮丽风景</NuxtLink>
      <NuxtLink to="/photo/portraits" active-class="active-link" class="sub-nav-item">人文纪实</NuxtLink>
      <NuxtLink to="/photo/cityscapes" active-class="active-link" class="sub-nav-item">都市掠影</NuxtLink>
      <NuxtLink to="/photo/cultural" active-class="active-link" class="sub-nav-item">文化探索</NuxtLink>
    </nav>

    <!-- 子页面内容显示区域 -->
    <div class="photo-content-area">
      <!-- NuxtChild 用于 Nuxt 2, NuxtPage 用于 Nuxt 3 -->
      <!-- 假设您使用的是 Nuxt 2 或 Nuxt 3 (NuxtPage 是 Nuxt 3 的写法) -->
      <NuxtChild :key="$route.path" /> 
      <!-- <NuxtPage :key="$route.path" /> -->
    </div>

  </div>
</template>

<script setup>
// 父页面的脚本（如果需要）
// import { useRouter } from 'vue-router'; // 如果在 Nuxt 3 中使用
// const router = useRouter();
</script>

<style scoped>
.page-container {
  background-color: #f0f2f5;
  overflow-x: hidden;
}

/* Hero Section Styles */
.hero-section {
  position: relative;
  width: 100vw;
  height: 70vh; /* 稍微减小一点，为子导航留出空间感 */
  overflow: hidden;
  background-color: #000;
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
    rgba(0, 0, 0, 0.2) 0%,
    transparent 40%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.hero-text-content {
  position: absolute;
  top: 50%; /* 调整垂直位置 */
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
  background-color: #ffffff; /* 子导航的背景色或页面主要内容区的背景色 */
  border-top-left-radius: 50% 100%;
  border-top-right-radius: 50% 100%;
  transform: scaleX(1.5);
  z-index: 5; /* 低于子导航 */
}

/* 子导航栏样式 */
.sub-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px; /* 调整padding让弧度更明显 */
  background-color: #ffffff; /* 与 curved-bottom 颜色一致或透明 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 10; /* 高于 curved-bottom */
  margin-top: -40px; /* 向上移动，部分覆盖弧形底部，根据弧形高度调整 */
  height: 60px; /* 子导航高度 */
  border-bottom: 1px solid #e0e0e0;
}

.sub-nav-item {
  padding: 0 25px; /* 增加左右padding */
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom-color 0.3s ease;
  border-bottom: 3px solid transparent;
  margin: 0 5px; /* 导航项之间的间距 */
}

.sub-nav-item:hover {
  color: #007bff;
}

.sub-nav-item.active-link { /* NuxtLink 激活时的类名 */
  color: #007bff;
  border-bottom-color: #007bff;
}

/* 子页面内容区域样式 */
.photo-content-area {
  padding: 40px 5%; /* 增加顶部padding */
  max-width: 1300px; /* 稍微增大宽度 */
  margin: 0 auto;
  background-color: #f0f2f5; /* 页面主要内容区的背景色 */
  min-height: 50vh; /* 确保内容区域有一定高度 */
}

/* 移除旧的 content-section 相关样式，因为它被 NuxtChild 取代了 */

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }
  .curved-bottom {
    height: 50px;
  }
  .sub-navigation {
    margin-top: -25px; /* 调整上移距离 */
    height: 50px;
    padding: 0 10px;
    overflow-x: auto; /* 允许横向滚动 */
    justify-content: flex-start; /* 小屏幕时从左开始排列 */
  }
  .sub-nav-item {
    padding: 0 15px;
    font-size: 0.9rem;
    white-space: nowrap; /* 防止文字换行 */
  }
  .photo-content-area {
    padding: 30px 5%;
  }
}
</style>
  

