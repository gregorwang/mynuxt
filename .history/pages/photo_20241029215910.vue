<template>
  <div class="container">
    <div class="image-wrapper">
      <img src="~/assets/despair.jpg" alt="Despair Image" class="despair-image" />
      <div class="overlay-text">
        2018 高考
        <button class="info-button">更多信息</button>
      </div>
    </div>
    <p class="caption">
      这是我在2018高考前3个月，所看的动画，当时我觉得在学校可能学习没有什么好处。很难上本科吧，想在家学习，但是发现自己的自制力好像非常差，所以结局也如同这张照片所揭示的那样。
    </p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.despair-image {
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
}

.overlay-text {
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.info-button {
  display: block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.caption {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #555;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
