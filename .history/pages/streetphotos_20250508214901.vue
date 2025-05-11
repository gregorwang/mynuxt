<template>
  <div class="street-photo-page">
    <!-- Hero Section -->
    <div class="hero-banner">
      <img src="~/assets/Sekiro_24.jpg" alt="Eolo Perfido" class="hero-image" />
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <h1>Eolo Perfido</h1>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-area">
      <h2 class="content-title">About Eolo</h2>
      <div class="bio-section">
        <h3 class="bio-subtitle">BIO</h3>
        <p>
          Eolo Perfido (b. 1972, Cognac, France) is an acclaimed portrait photographer whose versatile studio specializes in advertising, editorial, and fine art photography. His illustrious career has seen collaborations with world-renowned communication agencies, including Leo Burnett, United 1861, Gray, Saatchi & Saatchi, JWT, DDB, and BBDO.
          You can replace this text with more details about Eolo Perfido or any other content you wish to display here. This section is designed to provide biographical information or a description related to the main subject of the page.
        </p>
        <!-- You can add more paragraphs or content here -->
      </div>
    </div>

    <!-- Street Photography Gallery Section -->
    <div class="gallery-section">
      <h2 class="gallery-main-title">STREET PHOTOGRAPHY</h2>
      <div class="image-grid">
        <div class="grid-item">
          <img src="~/assets/1+-+Napoli-Street-Photography-2023.jpg" alt="Street Photography 1" />
        </div>
        <div class="grid-item">
          <img src="~/assets/2_Street_Photography_Rome_Q3_2024.jpg" alt="Street Photography 2" />
        </div>
        <div class="grid-item">
          <img src="~/assets/39_Street_Photography_Rome_Q3_2024.jpg" alt="Street Photography 3" />
        </div>
        <div class="grid-item">
          <img src="~/assets/70+-+Napoli-Street-Photography-2023.jpg" alt="Street Photography 4" />
        </div>
        <div class="grid-item">
          <img src="~/assets/81_Street_Photography_Rome_NiceHair_2023.jpg" alt="Street Photography 5" />
        </div>
        <div class="grid-item">
          <img src="~/assets/berlin-street-photography-2015-006.jpg" alt="Street Photography 6" />
        </div>
        <!-- 您可以继续添加更多图片 -->
        <!-- 
        <div class="grid-item">
          <img src="~/assets/Street-Photography-Portrait-BW-0036.jpg" alt="Street Photography 7" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Street-Photography-Portrait-BW-0090.jpg" alt="Street Photography 8" />
        </div>
        <div class="grid-item">
          <img src="~/assets/street-photography-roma.jpg" alt="Street Photography 9" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Tokyo-Japan-Street-Photography-098-LeicaQ.jpg" alt="Street Photography 10" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Tokyo-Japan-Street-Photography-137-LeicaSL2.jpg" alt="Street Photography 11" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Japan-street-photography-46.jpg" alt="Street Photography 12" />
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add any specific script logic for this page here
// For example, fetching data, methods, etc.
</script>

<style scoped>
.street-photo-page {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Hero Section Styles */
.hero-banner {
  position: relative;
  width: 100%;
  height: 60vh; /* Adjust height as needed, e.g., 400px, 50vh */
  overflow: hidden;
  background-color: #222; /* Fallback color if image doesn't load */
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area, might crop */
  object-position: center; /* Center the image */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Dark overlay for better text readability */
}

.hero-text {
  position: absolute;
  bottom: 40px; /* Position from bottom */
  right: 40px; /* Position from right */
  color: white;
  text-align: right;
}

.hero-text h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem); /* Responsive font size */
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Content Section Styles */
.content-area {
  max-width: 900px; /* Max width of the content */
  margin: 40px auto; /* Center the content with top/bottom margin */
  padding: 0 20px; /* Padding on the sides */
}

.content-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: #2c3e50;
}

.bio-section {
  margin-top: 15px;
}

.bio-subtitle {
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.bio-section p {
  font-size: 1rem;
  color: #4a4a4a;
  margin-bottom: 15px;
  text-align: justify;
}

/* Street Photography Gallery Section Styles */
.gallery-section {
  padding: 40px 20px; /* 上下和左右内边距 */
  text-align: center; /* 标题居中 */
}

.gallery-main-title {
  font-size: 2.5rem; /* "STREET PHOTOGRAPHY" 标题字号 */
  font-weight: bold;
  margin-bottom: 40px; /* 标题与图片网格的间距 */
  color: #2c3e50; /* 标题颜色 */
  text-transform: uppercase; /* 字母大写 */
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 响应式网格布局，每列最小300px */
  gap: 15px; /* 图片之间的间距 */
  max-width: 1200px; /* 网格最大宽度 */
  margin: 0 auto; /* 网格居中 */
}

.grid-item {
  width: 100%;
  overflow: hidden; /* 确保图片不会超出容器 */
  background-color: #f0f0f0; /* 图片加载时的占位背景色 */
}

.grid-item img {
  width: 100%;
  height: 100%; /* 使图片高度填充容器，可能需要调整 object-fit */
  object-fit: cover; /* 裁剪图片以填充容器，保持宽高比 */
  display: block; /* 移除图片下方的额外空间 */
  transition: transform 0.3s ease, opacity 0.3s ease; /* 平滑过渡效果 */
  opacity: 0.9;
}

.grid-item img:hover {
  transform: scale(1.05); /* 鼠标悬停时放大图片 */
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-banner {
    height: 50vh;
  }

  .hero-text {
    bottom: 20px;
    left: 20px; /* Adjust for smaller screens, maybe centered or left-aligned */
    right: auto;
    text-align: left;
  }

  .hero-text h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }

  .content-area {
    margin: 30px auto;
  }

  .content-title {
    font-size: 1.8rem;
  }

  .gallery-main-title {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* 在较小屏幕上调整列宽 */
    gap: 10px;
  }
}
</style>