<template>
  <div class="page-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <img src="~/assets/despair.jpg" alt="Background Image" class="hero-background-image" />
      <div class="gradient-overlay"></div>
      <div class="hero-text-content">
        <h1 class="main-title">
          <span class="title-main-text">急惰</span>
          <span class="title-year">2025</span>
        </h1>
        <p class="subtitle">
          探索街头摄影的魅力，捕捉每一个瞬间。
        </p>
      </div>
      <div class="curved-bottom"></div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <h2 class="content-title">东京：街头摄影的完美目的地</h2>
      <div class="content-body">
        <div class="text-column">
          <p>
            东京，日本的首都，是一座独特地融合了现代与传统的城市。这种融合为街头摄影爱好者提供了令人难以置信的背景。
          </p>
          <p>
            这座城市充满了灯光、色彩和建筑。摩天大楼与传统寺庙并肩而立。新宿或涩谷狭窄拥挤的街道与浅草或谷中的宁静历史区域形成对比。这种多样性提供了广泛的背景和场景供捕捉。
          </p>
          <p>
            日本文化非常注重美学。无论是鲜艳的招牌、商店陈列、街头时尚还是传统节日，每一个元素都具有强大的视觉冲击力。这些丰富的细节是摄影师的天堂。
          </p>
          <p>
            此外，它被认为是世界上最安全的城市之一。这使得摄影师即使在夜晚城市灯光营造出神奇而神秘氛围时，也能安心探索。
          </p>
          <p>
            凭借高效的公共交通系统，您可以轻松地从一个社区移动到另一个社区，并在短时间内沉浸在不同的场景中。这使得在一天之内捕捉各种图像成为可能。
          </p>
          <p>
            东京确实是一个不夜城，总是在发展，总是在运动。其复杂性和美丽为街头摄影提供了无尽的机会，使其成为该流派所有爱好者的必游之地。
          </p>
          <button class="info-button content-button" @click="navigateToMoreInfo">
            <span>了解更多</span>
            <span class="arrow">→</span>
          </button>
        </div>
        <div class="image-column">
          <img src="~/assets/user-image-1.jpg" alt="Tokyo Street Scene 1" class="content-image" />
          <img src="~/assets/user-image-2.jpg" alt="Tokyo Street Scene 2" class="content-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToMoreInfo() {
  // 您可以根据需要修改此路由
  router.push('/more-info');
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
  height: 90vh; /* Adjust height as needed */
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
  top: 55%; /* Adjusted for better visual balance with large text */
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 90%;
  max-width: 1200px; /* Max width for large text */
}

.main-title {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Example font */
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin: 0;
  line-height: 1.1;
}

.title-main-text {
  display: block;
  font-size: clamp(3rem, 12vw, 10rem); /* Responsive font size */
  letter-spacing: -0.02em; /* Slightly tighter letter spacing */
}

.title-year {
  display: block;
  font-size: clamp(3rem, 12vw, 10rem); /* Responsive font size */
  font-weight: 200; /* Lighter weight for the year part if desired */
  letter-spacing: 0.05em;
}

.subtitle {
  font-size: clamp(1rem, 3vw, 1.75rem); /* Responsive font size */
  font-weight: 300;
  letter-spacing: 0.02em;
  margin-top: 1.5rem;
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.curved-bottom {
  position: absolute;
  bottom: -1px; /* To hide the straight edge of the hero section */
  left: 0;
  width: 100%;
  height: 100px; /* Adjust height of the curve */
  background-color: #f0f2f5; /* Match page background */
  border-top-left-radius: 50% 100%; /* Creates the curve */
  border-top-right-radius: 50% 100%; /* Creates the curve */
  transform: scaleX(1.5); /* Makes the curve wider and shallower */
}


/* Content Section Styles */
.content-section {
  padding: 80px 5% 50px; /* Adjust padding, top padding accounts for curve */
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f0f2f5; /* Ensure this matches curved-bottom */
  position: relative; /* Needed if curved-bottom uses z-index */
  z-index: 1;
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
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 40px;
}

.text-column {
  flex: 2; /* Takes more space */
  min-width: 300px; /* Minimum width before wrapping */
}

.text-column p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
}

.image-column {
  flex: 1; /* Takes less space */
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 250px; /* Minimum width before wrapping */
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
  .hero-text-content {
    top: 50%;
  }
  .main-title {
    /* Adjust font sizes for smaller screens if needed */
  }
  .subtitle {
    /* Adjust font sizes for smaller screens if needed */
  }
  .content-body {
    flex-direction: column;
  }
  .curved-bottom {
    height: 60px; /* Shallower curve on mobile */
  }
  .content-section {
    padding-top: 60px;
  }
}
</style>
  

