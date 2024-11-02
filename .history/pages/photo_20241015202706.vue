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
  import axios from 'axios';
  
  export default {
    name: 'PhotoPage',
    data() {
      return {
        photos: [],  // 用于存放获取到的照片数据
      };
    },
    mounted() {
      this.fetchPhotos();
    },
    methods: {
      async fetchPhotos() {
        try {
          const response = await axios.get('/api/photos');  // 调用API获取照片数据
          this.photos = response.data;
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
  