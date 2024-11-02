<template>
    <div>
      <h1>My Photos</h1>
      <div v-if="photos.length">
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
  .photo-item {
    margin: 10px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  