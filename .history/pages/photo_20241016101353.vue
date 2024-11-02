<template>
  <div>
    <h1>My Photos</h1>
    <div v-if="photos.length" class="photos-grid">
      <div v-for="(photo, index) in photos" :key="index" class="photo-item" @click="openPhoto(photo.url)">
        <img :src="photo.url" :alt="'Photo ' + index" />
      </div>
    </div>
    <div v-else>
      <p>No photos available.</p>
    </div>
    <div v-if="selectedPhoto" class="photo-modal" @click="closePhoto">
      <img :src="selectedPhoto" alt="Expanded Photo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoPage',
  data() {
    return {
      photos: [],
      selectedPhoto: null,
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
    openPhoto(url) {
      this.selectedPhoto = url;
    },
    closePhoto() {
      this.selectedPhoto = null;
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
  cursor: pointer;
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
.photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.photo-modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}
</style>