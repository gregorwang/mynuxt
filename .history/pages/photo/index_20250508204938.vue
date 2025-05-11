<template>
  <div class="photo-category-page">
    <h2>欢迎来到光影瞬间</h2>
    <p>在这里，我们汇集了世界各地的风景名胜与人文风情。请通过上方导航探索不同主题的摄影作品集。</p>
    <p>每一个系列都代表着一种独特的视角和情感的捕捉。</p>
    <!-- 您可以在这里放一些精选的缩略图或介绍性内容 -->
    <div class="featured-gallery">
      <div class="gallery-item placeholder">
        <p>精选图片区域</p>
      </div>
       <div class="gallery-item placeholder">
        <p>探索更多...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 首页概览的特定逻辑（如果需要）
</script>

<style scoped>
.photo-category-page {
  text-align: center;
  padding: 20px;
}
.photo-category-page h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 15px;
}
.photo-category-page p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.featured-gallery {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
.gallery-item.placeholder {
  width: 200px;
  height: 150px;
  background-color: #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-style: italic;
}
</style>