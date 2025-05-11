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
      </div>
    </div>

    <!-- Portrait Photography Gallery Section -->
    <div class="gallery-section portrait-gallery">
      <h2 class="gallery-main-title">PORTRAIT PHOTOGRAPHY</h2>
      <div class="image-grid">
        <div class="grid-item">
          <img src="~/assets/Carlo-Carletti-3.jpg" alt="Portrait Photography 1" />
        </div>
        <div class="grid-item">
          <img src="~/assets/emc+-+Alessandro+-+4+-+2022.jpg" alt="Portrait Photography 2" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Grace-1-2022.jpg" alt="Portrait Photography 3" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Maria-Soccorsa-Laforge_Portraits_2 (1).jpg" alt="Portrait Photography 4" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Maria-Soccorsa-Laforge_Portraits_2.jpg" alt="Portrait Photography 5" />
        </div>
        <div class="grid-item">
          <img src="~/assets/Portfolio_Clownville_The_Rest_1.jpg" alt="Portrait Photography 6" />
        </div>
        <!-- 您可以根据需要继续添加更多肖像图片 -->
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

/* Gallery Section Styles (通用样式，适用于所有画廊) */
.gallery-section {
  padding: 40px 10px; /* 顶部/底部 40px, 左右 10px 的内边距 */
  text-align: center;
}

.gallery-main-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 40px;
  color: #2c3e50;
  text-transform: uppercase;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 固定为三列 */
  gap: 10px; /* 图片之间的间隙设置为 10px */
}

.grid-item {
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
  opacity: 0; /* 初始状态为透明，用于动画 */
  transform: translateY(20px); /* 初始状态向下偏移，用于动画 */
  animation: fadeInSlideUp 0.6s ease-out forwards;
  /* 为不同的子元素设置动画延迟，实现交错效果 */
}

/* 为每个画廊中的前几个元素添加交错动画延迟示例 */
/* 注意：这些 :nth-child 选择器会分别应用于每个 .image-grid 内的 .grid-item */
.image-grid .grid-item:nth-child(1) { animation-delay: 0.1s; }
.image-grid .grid-item:nth-child(2) { animation-delay: 0.2s; }
.image-grid .grid-item:nth-child(3) { animation-delay: 0.3s; }
.image-grid .grid-item:nth-child(4) { animation-delay: 0.15s; } /* 可以调整延迟以获得不同效果 */
.image-grid .grid-item:nth-child(5) { animation-delay: 0.25s; }
.image-grid .grid-item:nth-child(6) { animation-delay: 0.35s; }
/* 您可以为更多项添加 :nth-child 规则，或者使用 JavaScript 实现更动态的交错动画 */


@keyframes fadeInSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9; /* 保持图片轻微的透明效果 */
}

.grid-item img:hover {
  transform: scale(1.05);
  opacity: 1; /* 悬停时完全不透明 */
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
    grid-template-columns: repeat(3, 1fr); /* 在较小屏幕上也保持三列 */
    gap: 5px; /* 在小屏幕上可以适当减小间隙 */
  }
  .gallery-section {
    padding: 30px 5px; /* 在小屏幕上也可以调整内边距 */
  }
}
</style>