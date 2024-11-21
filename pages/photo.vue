<template>
  <div class="container">
    <div class="image-wrapper">
      <img src="~/assets/despair.jpg" alt="Despair Image" class="despair-image" />
      <div class="gradient-overlay"></div>
      <div class="overlay-text">
        <span class="year">2018</span>
        <span class="exam">急惰</span>
        <button class="info-button" @click="navigateToMoreInfo">
          <span>更多信息</span>
          <span class="arrow">→</span>
        </button>
        <p class="caption">
          未完成界面，待补充，预计2025年4月前完成
        </p>
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
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.despair-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
    rgba(0, 0, 0, 0.5) 0%,
    transparent 30%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 100%;
}

.year {
  display: block;
  font-size: 5rem;
  font-weight: 200;
  letter-spacing: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.exam {
  display: block;
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 1rem;
  margin-bottom: 2rem;
}

.info-button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: white;
  padding: 12px 30px;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 2rem;
}

.info-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.arrow {
  transition: transform 0.3s ease;
}

.info-button:hover .arrow {
  transform: translateX(5px);
}

.caption {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  letter-spacing: 0.05rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
  

