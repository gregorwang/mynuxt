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
@apply text-center p-5;

.image-wrapper {
  @apply relative inline-block;
}

.despair-image {
  @apply w-full max-w-lg rounded-lg;
}

.overlay-text {
  @apply absolute top-5 left-5 text-white text-2xl font-bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.info-button {
  @apply mt-2 px-4 py-2 bg-white bg-opacity-80 text-black rounded-lg cursor-pointer text-base;
}

.caption {
  @apply mt-5 text-lg text-gray-600 max-w-lg mx-auto;
}
</style>

