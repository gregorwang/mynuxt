<template>
  <div>
    <h1>My Photos</h1>
    <div v-if="photos.length" class="photos-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item">
        <img :src="photo.url" :alt="'Photo ' + index" />
      </div>
    </div>
    <div v-else>
      <p>No photos available.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoPage',
  data() {
    return {
      photos: [],
    };
  },
  async mounted() {
    await this.fetchPhotos();
  },
  methods: {
    async fetchPhotos() {
      try {
        const response = await fetch('/api/photos');
        this.photos = await response.json();
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      }
    },
  },
};
</script>

<style scoped>
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}
.photo-item {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.photo-item:hover {
  transform: scale(1.05);
}
img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
</style>