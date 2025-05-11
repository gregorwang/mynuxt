<template>
  <div class="photo-category-page">
    <h2>壮丽风景</h2>
    <p>这里展示了令人叹为观止的自然风光和广阔天地。</p>
    <div class="gallery">
      <!-- 示例图片，请替换为您自己的图片资源 -->
      <div class="gallery-item">
        <img src="~/assets/user-image-1.jpg" alt="风景图片1">
        <div class="caption">山川之美</div>
      </div>
      <div class="gallery-item">
        <img src="~/assets/user-image-2.jpg" alt="风景图片2">
        <div class="caption">海滨风光</div>
      </div>
      <div class="gallery-item placeholder-image"><span>风景图片3</span></div>
      <div class="gallery-item placeholder-image"><span>风景图片4</span></div>
    </div>
  </div>
</template>

<script setup>
// 此页面的特定逻辑
</script>

<style scoped>
.photo-category-page h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
  text-align: left;
}
.photo-category-page p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 25px;
  text-align: left;
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}
.gallery-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.gallery-item:hover img {
  transform: scale(1.05);
}
.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 8px;
  font-size: 0.9rem;
  text-align: center;
}
.placeholder-image {
  width: 100%;
  height: 220px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-style: italic;
  border-radius: 8px;
}
</style>