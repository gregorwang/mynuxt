<template>
  <div class="page-container">
    <!-- 透明固定导航栏 -->
    <nav class="fixed-nav">
      <div class="nav-container">
        <NuxtLink to="/" class="nav-item">返回主页</NuxtLink>
        <NuxtLink to="/mi" class="nav-item">随手街拍</NuxtLink>
        <NuxtLink to="/xiao" class="nav-item">往日之影</NuxtLink>
        <NuxtLink to="/kai" class="nav-item">迷离抽象</NuxtLink>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section">
      <img src="~/assets/despair.jpg" alt="Background Image" class="hero-background-image" />
      <div class="gradient-overlay"></div>
      <div class="hero-text-content">
        <h1 class="main-title">
          <span class="title-main-text">光影瞬间</span>
          <span class="title-year">探索集</span>
        </h1>
        <p class="subtitle">
          每一个角落，都有不一样的故事与风景。
        </p>
      </div>
      <div class="curved-bottom"></div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <h2 class="content-title">影像故事：捕捉世界的色彩</h2>
      <div class="content-body">
        <div class="text-column">
          <p>
            摄影是光与影的艺术，是瞬间与永恒的对话。它让我们能够凝固时间，分享视角，讲述那些无法用言语完全表达的故事。
          </p>
          <p>
            无论是壮丽的自然风光，还是细腻人文情感，亦或是繁华都市的动态节奏，每一张照片背后都蕴藏着独特的观察和感悟。
          </p>
          <p>
            探索不同的主题，尝试多样的构图，用镜头发现生活中的美好与不凡。这个空间旨在分享那些触动心灵
          </p>
          <button class="info-button content-button" @click="navigateToMoreInfo">
            <span>了解更多</span>
            <span class="arrow">→</span>
          </button>
        </div>
        <div class="image-column">
          <img src="~/assets/Sekiro-conceptart-14.jpg" alt="内容图片1" class="content-image" />
          <img src="~/assets/yhj.jpg" alt="内容图片2" class="content-image" />
        </div>
      </div>
    </div>

    <!-- Details Section -->
    <div class="details-section">
      <div class="details-image-column">
        <img src="~/assets/image5.jpg" alt="Details Image" class="details-image" />
      </div>
      <div class="details-text-column">
        <h2 class="details-main-title">Details</h2>
        <p class="details-year"><strong>2025</strong></p>
        <p>Session 1: June 9th - 15th, 2025 (SOLD OUT)</p>
        <p>Session 2: June 16th - 22nd, 2025 (SOLD OUT)</p>
        <p>6 Days</p>
        <p>$4,600 USD (Deposit of $600 secures spot)</p>
        <p>Number of participants: 14</p>
        <p>All Participants Must be 18 and Over</p>
        <p>Languages: English</p>
        <p>Welcome Dinner: Included</p>
        <p class="not-included-title"><strong>Not Included:</strong></p>
        <ul class="not-included-list">
          <li>Lodging</li>
          <li>Meals and beverages</li>
          <li>Transportation</li>
          <li>Travel to and from the workshop destination</li>
          <li>Visa and taxes</li>
          <li>Travel insurance</li>
          <li>Photographic equipment</li>
        </ul>
        <button class="details-button">Itinerary</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToMoreInfo() {
  router.push('/more-info');
}
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
  height: 70vh;
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
  background-color: #f0f2f5;
  border-top-left-radius: 50% 100%; 
  border-top-right-radius: 50% 100%; 
  transform: scaleX(1.5); 
  z-index: 1;
}

/* Content Section Styles */
.content-section {
  padding: 80px 5% 50px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f2f5;
  position: relative; 
  z-index: 0;
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

/* Details Section Styles */
.details-section {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 50px 5%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #ffffff;
}

.details-image-column {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: flex-start;
}

.details-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.details-text-column {
  flex: 1.5;
  min-width: 300px;
  color: #333;
  font-family: Arial, sans-serif;
}

.details-main-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.details-year {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.details-text-column p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 8px;
}

.not-included-title {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1rem;
}

.not-included-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 5px;
  font-size: 0.95rem;
}

.not-included-list li {
  margin-bottom: 5px;
}

.details-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 12px 35px;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  display: inline-block;
}

.details-button:hover {
  background-color: #34495e;
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
    padding-top: 60px;
  }
  .content-body {
    flex-direction: column;
  }
  .details-section {
    flex-direction: column;
    padding: 30px 5%;
  }
  .details-image-column {
    align-items: center;
    margin-bottom: 20px;
  }
  .details-image {
    max-width: 100%;
  }
}

/* 透明固定导航栏样式 */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: background 0.3s ease;
}

.fixed-nav:hover {
  background: rgba(0, 0, 0, 0.5);
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 16px;
  margin: 0 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after {
  width: 70%;
}

/* 为了确保导航栏不会遮挡内容，给页面容器添加上边距 */
.page-container {
  padding-top: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-container {
    padding: 10px;
    flex-wrap: wrap;
  }
  .nav-item {
    margin: 5px;
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}

/* 确保其他样式保持不变 */
</style>

  

