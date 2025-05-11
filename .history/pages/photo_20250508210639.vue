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

    <!-- Content Section (恢复原有逻辑) -->
    <div class="content-section">
      <h2 class="content-title">影像故事：捕捉世界的色彩</h2> <!-- 您可以修改这里的标题 -->
      <div class="content-body">
        <div class="text-column">
          <p>
            摄影是光与影的艺术，是瞬间与永恒的对话。它让我们能够凝固时间，分享视角，讲述那些无法用言语完全表达的故事。
          </p>
          <p>
            无论是壮丽的自然风光，还是细腻人文情感，亦或是繁华都市的动态节奏，每一张照片背后都蕴藏着独特的观察和感悟。
          </p>
          <p>
            探索不同的主题，尝试多样的构图，用镜头发现生活中的美好与不凡。这个空间旨在分享那些触动心灵的影像作品。
          </p>
          <button class="info-button content-button" @click="navigateToMoreInfo">
            <span>了解更多</span>
            <span class="arrow">→</span>
          </button>
        </div>
        <div class="image-column">
          <!-- 从 assets 文件夹中引用图片 -->
          <img src="~/assets/Sekiro-conceptart-14.jpg" alt="内容图片1" class="content-image" />
          <img src="~/assets/yhj.jpg" alt="内容图片2" class="content-image" />
        </div>
      </div>
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


/* Content Section Styles (Restored) */
.content-section {
  padding: 80px 5% 50px; /* Adjust padding, top padding accounts for curve */
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f2f5; /* Ensure this matches curved-bottom */
  position: relative; 
  z-index: 0; /* Ensure it's behind the curve if needed, or adjust curve's z-index */
}

.content-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  text-align: left;
}

.content-body {
  display: flex;
  flex-wrap: wrap; 
  gap: 40px;
}

.text-column {
  flex: 2; 
  min-width: 300px; 
}

.text-column p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
}

.image-column {
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 250px; 
}

.content-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.info-button {
  background: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 12px 30px;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  margin-top: 1rem;
}

.info-button:hover {
  background: #007bff;
  color: white;
}

.arrow {
  transition: transform 0.3s ease;
}

.info-button:hover .arrow {
  transform: translateX(5px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }
  .curved-bottom {
    height: 50px; 
  }
  .content-section {
    padding-top: 60px; /* Adjust if curve height changes */
  }
   .content-body {
    flex-direction: column;
  }
}
</style>
  

