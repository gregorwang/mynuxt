<template>
  <div>
    <section class="showcase">
      <header>
        <div class="toggle"></div>
      </header>
      <video ref="video" :src="videoSrc" muted loop autoplay></video>
      <div class="text">
        <h2>最喜欢的动漫</h2>
        <h3>人生中一部分时间由他们陪伴我度过</h3>
      </div>
    </section>

    <div class="ranks">
      <ul>
        <li><a href="#">从零开始的异世界生活</a></li>
        <li><a href="#">火影忍者</a></li>
        <li><a href="#">进击的巨人</a></li>
        <li><a href="#">鬼灭之刃</a></li>
        <li><a href="#">斩！赤红之瞳</a></li>
        <li><a href="#">来自多彩世界的明天</a></li>
        <li><a href="#">擅长作弄的高木同学</a></li>
        <li><a href="#">一拳超人</a></li>
        <li><a href="#">fate</a></li>
        <li><a href="#">钢之炼金术师</a></li>
        <li><a href="#">樱花庄的宠物女孩</a></li>
      </ul>
    </div>

    <!-- 自定义模态框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>是否播放声音？</p>
        <button @click="playSound(true)">播放声音</button>
        <button @click="playSound(false)">静音播放</button>
      </div>
    </div>
  </div>
</template>

<script>
import videoSrc from '@/assets/you.mp4';
import menuImage from '@/assets/menu.png';
import closeImage from '@/assets/close.png';

export default {
  name: 'AnimePage',
  data() {
    return {
      videoSrc,
      menuImage,
      closeImage,
      showModal: true, // 控制模态框的显示
    };
  },
  methods: {
    playSound(withSound) {
      const videoElement = this.$refs.video;

      if (withSound) {
        videoElement.muted = false; // 取消静音
        videoElement.volume = 1; // 设置音量为 100%
      } else {
        videoElement.muted = true; // 保持静音
      }

      videoElement.play().catch(error => {
        console.error('播放失败:', error);
      });

      this.showModal = false; // 隐藏模态框
    }
  },
  mounted() {
    const menuToggle = document.querySelector('.toggle');
    const showcase = document.querySelector('.showcase');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      showcase.classList.toggle('active');
    });
  },
};
</script>


<style scoped>
/* 原有样式保持不变 */
* {
  @apply box-border m-0 p-0;
}

.showcase {
  @apply absolute right-0 w-full min-h-screen p-24 flex justify-between items-center bg-black text-white z-20 transition duration-500;
}

.showcase.active {
  right: 300px; /* 确保 Tailwind CSS 已经配置了相应的间距值 */
}

.showcase header {
  @apply absolute top-0 left-0 w-full p-10 z-50 flex justify-between items-center;
}

.showcase video {
  @apply absolute top-0 left-0 w-full h-full opacity-80 object-cover;
}

.toggle {
  @apply absolute w-15 h-15 bg-center bg-no-repeat cursor-pointer top-0 right-0;
  background-image: url('../assets/menu.png'); /* 确保资源路径正确 */
  background-size: 30px;
}

.toggle.active {
  background-image: url('../assets/close.png'); /* 确保资源路径正确 */
  background-size: 30px;
}

.text {
  @apply relative z-10;
}

.text h2 {
  @apply text-5xl font-extrabold uppercase leading-none;
}

.text h3 {
  @apply text-4xl font-bold uppercase leading-none;
}

.text p {
  @apply text-lg my-5 font-normal max-w-2xl;
}

.social {
  @apply absolute bottom-5 z-10 flex justify-center items-center;
}

.social li {
  @apply list-none;
}

.social li a {
  @apply inline-block w-10 mr-5 transition duration-500;
}

.social li a:hover {
  @apply transform -translate-y-3;
}

.social li a img {
  @apply w-full;
}

.ranks {
  @apply absolute top-0 right-0 w-75 h-full flex items-center justify-center;
}

.ranks ul {
  @apply list-none;
}

.ranks ul li {
  @apply mt-5;
}

.ranks ul li a {
  @apply no-underline text-2xl text-gray-900;
}

.ranks ul li a:hover {
  @apply text-lightblue;
}

/* 新增模态框样式 */
.modal {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-white p-5 rounded-lg text-center;
}

.modal-content button {
  @apply m-2 p-2 px-5 text-lg cursor-pointer;
}

@media (max-width: 991px) {
  .showcase,
  .showcase header {
    @apply p-10;
  }

  .text h2 {
    @apply text-3xl;
  }

  .text h3 {
    @apply text-2xl;
  }
}
</style>


