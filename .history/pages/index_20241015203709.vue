<template>
  <div>
    <div class="my-component font-sans">
      <div
        class="hero bg-cover bg-center bg-no-repeat w-full h-screen relative text-white text-center transition-all duration-500"
        :style="{ backgroundImage: `url(${images[currentImageIndex].src})` }"
      >
        <div class="nav absolute top-5 right-5 p-2 bg-transparent">
          <ul class="list-none p-0 m-0">
            <li v-for="link in links" :key="link.text" class="inline-block mr-2">
              <NuxtLink v-if="link.type === 'internal'" :to="link.href" class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300">
                {{ link.text }}
              </NuxtLink>
              <a v-else :href="link.href" @click.prevent="link.clickAction" class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Hero Text -->
        <div class="hero-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-5">
          <h2 v-html="images[currentImageIndex].text" class="text-4xl"></h2>
        </div>

        <!-- Dots for Image Navigation -->
        <div class="dots absolute bottom-5 left-1/2 transform -translate-x-1/2 flex">
          <span
            v-for="(image, index) in images"
            :key="index"
            class="dot h-4 w-4 mx-1.5 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300"
            :class="{ 'bg-gray-600': currentImageIndex === index }"
            @click="changeImage(index)"
          ></span>
        </div>
      </div>
    </div>

    <!-- Social Media Links -->
    <div class="title mb-5 relative text-center">
      <div class="block text-sm mb-1 text-white">FOLLOW ME @SOCIAL MEDIA</div>
      <h2 class="text-xl m-0">关注社交媒体上的我</h2>
    </div>
    <dl class="flex justify-center flex-wrap list-none p-0 m-0">
      <dd v-for="(social, index) in socialLinks" :key="index" class="m-2 relative">
        <a :href="social.href" :title="social.title" target="_blank">
          <img :src="social.image" :alt="social.title" class="w-12 h-12 object-cover" />
        </a>
        <div v-if="social.layer" class="layer hidden absolute top-14 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 border border-gray-300 p-2 z-10 text-center">
          <div class="ewm text-center">
            <div class="img">
              <img :src="social.qr" alt="QR Code" class="w-48 h-48" />
            </div>
            <div class="name mt-2 text-sm text-gray-800">{{ social.name }}</div>
          </div>
        </div>
      </dd>
    </dl>

    <!-- Gallery Section -->
    <div class="gallery grid gap-0 m-8 p-8 md:grid-cols-4 sm:grid-cols-2">
      <div
        v-for="(item, index) in galleryItems"
        :key="index"
        class="gallery-item relative box-border overflow-hidden"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div class="info absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-1 text-sm">
          <p class="m-0">{{ item.date }}</p>
          <p class="m-0">{{ item.description }}</p>
          <p class="m-0">{{ item.source }}</p>
        </div>
      </div>
    </div>

    <!-- Message Board -->
    <MessageBoard />

    <!-- Canvas Example -->
    <div class="canvas-wrapper relative text-center mt-8">
      <canvas id="myCanvas" width="800" height="400" class="border border-gray-300"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentImageIndex: 0,
      images: [
        { src: 'path/to/image1.jpg', text: 'Image 1 Text' },
        { src: 'path/to/image2.jpg', text: 'Image 2 Text' },
      ],
      links: [
        { text: '开发历史', type: 'internal', href: '/history' },
        { text: '个人兴趣', type: 'dropdown', href: '#'},
        { text: '随手记录', type: 'external', href: '#', clickAction: this.showAlert },
        { text: '多邻国测试', type: 'internal', href: '/dlg' },
      ],
      socialLinks: [
        { href: 'javascript:;', title: 'QQ', image: 'path/to/qqImage.jpg', layer: true, qr: 'path/to/qr198.jpg', name: '个人QQ' },
        { href: 'javascript:;', title: 'WeChat', image: 'path/to/wechatImage.jpg', layer: true, qr: 'path/to/qr125.jpg', name: '个人微信' },
        { href: 'https://space.bilibili.com/353753278', title: 'B站', image: 'path/to/biliImage.jpg' },
        { href: 'https://www.xiaohongshu.com/user/profile', title: '小红书', image: 'path/to/xhsImage.jpg' },
      ],
      galleryItems: [
        { src: 'path/to/gallery1.jpg', alt: 'Gallery Item 1', date: '2024-01-01', description: '描述1', source: '来源1' },
        { src: 'path/to/gallery2.jpg', alt: 'Gallery Item 2', date: '2024-02-01', description: '描述2', source: '来源2' },
      ],
    };
  },
  mounted() {
    this.setupCanvas();
  },
  methods: {
    changeImage(index) {
      this.currentImageIndex = index;
    },
    showAlert() {
      alert('功能尚未实现');
    },
    setupCanvas() {
      const canvas = document.getElementById('myCanvas');
      const ctx = canvas.getContext('2d');
      // Draw an example rectangle on canvas
      ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
      ctx.fillRect(100, 100, 200, 100);
      // Add other canvas drawing logic as needed
    },
  },
};
</script>

<style scoped>
.hero {
  transition: background-image 0.5s ease-in-out;
}
.dropdown-content {
  transition: all 0.3s;
}
.layer {
  display: none;
}
.relative:hover .layer {
  display: block;
}
</style>

<script setup>
import { ref, onMounted } from 'vue';
import MessageBoard from '~/components/MessageBoard.vue';
import { useThemeStore } from '~/stores/theme';
import qqImage from '~/assets/qq.png';
import wechatImage from '~/assets/wechat.png';
import biliImage from '~/assets/bili.png';
import xhsImage from '~/assets/xhs.png';
import qr198 from '~/assets/198.png';
import qr125 from '~/assets/125.png';
import yhjImage from '~/assets/yhj.jpg';
import pexelsPokRieImage from '~/assets/pexels-pok-rie-33563-2049422.jpg';
import pexelsArnieChouImage from '~/assets/pexels-arnie-chou-304906-1229042.jpg';
import image1 from '~/assets/image1.jpg';
import image2 from '~/assets/image2.png';
import image3 from '~/assets/image3.png';
import image4 from '~/assets/image4.jpg';
import image5 from '~/assets/image5.jpg';
import image6 from '~/assets/image6.jpg';

// 数据定义
const themeStore = useThemeStore();
const currentImageIndex = ref(0);
const images = ref([
  { src: yhjImage, text: '本网站云服务器由谷歌公司提供3个月的免费试用，感谢他们，薅完谷歌的羊毛再准备薅aws了' },
  { src: pexelsPokRieImage, text: '该网站主要由chatgpt4o和Gemini 1.5flash完成。<br>"小tips：我只负责复制粘贴，纯手写写不出来"' },
  { src: pexelsArnieChouImage, text: '大模型的能力太夸张了，以后这个失业率都不敢想象。<br>"gregorwang是企业微信的id，icu是最便宜的域名，一年才8元钱."' },
]);
const links = ref([
  { text: '开发历史', type: 'internal', href: '/history' },
  { text: '个人兴趣', type: 'dropdown', href: '#', clickAction: () => showAlert() },
  { text: '随手记录', type: 'external', href: '#', clickAction: () => showAlert() },
  { text: '多邻国测试', type: 'internal', href: '/dlg' },
]);
const socialLinks = ref([
  { href: 'javascript:;', title: 'QQ', image: qqImage, layer: true, qr: qr198, name: '个人QQ' },
  { href: 'javascript:;', title: 'WeChat', image: wechatImage, layer: true, qr: qr125, name: '个人微信' },
  { href: 'https://space.bilibili.com/353753278', title: 'B站', image: biliImage },
  { href: 'https://www.xiaohongshu.com/user/profile', title: '小红书', image: xhsImage },
]);
const galleryItems = ref([
  { src: image1, alt: 'Image 1', date: '03月14日 15:14', description: '骑自行车来看胶州湾大桥', source: '来源：个人摄影' },
  { src: image2, alt: 'Image 2', date: '03月1日 09:13', description: '作死在马路中间拍照', source: '来源：个人摄影' },
  { src: image3, alt: 'Image 3', date: '01月28日 16:07', description: '给鸽子吃爽了', source: '来源：个人摄影' },
  { src: image4, alt: 'Image 4', date: '03月29日 15:31', description: '青岛小珠山爬山，很累', source: '来源：个人摄影' },
  { src: image5, alt: 'Image 5', date: '1月1日 09:29', description: '小区的野猫看起来有点哈人', source: '来源：个人摄影' },
  { src: image6, alt: 'Image 6', date: '2023年11月29日 16:39', description: '这就是小米手机的画质！', source: '来源：个人摄影' },
]);

// 方法定义
const changeImage = (index) => {
  currentImageIndex.value = index;
};

const showAlert = () => {
  alert('正在开发中请耐心等待');
};

const setupCanvas = () => {
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    // Draw an example rectangle on canvas
    ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
    ctx.fillRect(100, 100, 200, 100);
  }
};

// 生命周期钩子
onMounted(() => {
  setupCanvas();
});
</script>
<style scoped>
.hero {
  background-image: url('~/assets/iuo.jpg');
}
.dropdown-content a:hover {
  @apply bg-gray-200;
}
.nav li:hover .dropdown-content {
  @apply block;
}
.layer {
  @apply overflow-hidden;
}
dl dd:hover .layer {
  @apply block;
}
.gallery {
  @apply grid grid-cols-2 gap-4;
}
.gallery-item {
  @apply relative;
}
.gallery-item img {
  @apply w-full h-full object-cover;
}
.gallery-item .overlay {
  @apply absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white;
}
.gallery-item .overlay .date {
}
.gallery-item .overlay .description {
  @apply text-lg;
}

.nav li {
  @apply relative inline-block mr-2.5;
}
.nav a {
  @apply text-white text-center py-3.5 px-4 no-underline font-sans font-bold text-lg transition-colors duration-300;
}
.nav a:hover {
  @apply text-yellow-500;
}
.dropdown-content {
  @apply hidden absolute;
}

.group:hover .dropdown-content {
  @apply block;
}
.hero {
  @apply bg-cover bg-center bg-no-repeat w-full h-screen relative text-white text-center transition-all duration-500 ease-in-out;
  background-image: url('~/assets/iuo.jpg');
}
.hero-text {
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-5 text-center;
}
.dots {
  @apply absolute bottom-5 left-1/2 transform -translate-x-1/2 flex;
}

.dropdown-content a {
  @apply text-black py-3 px-4 no-underline block text-left;
}
.dot {
  @apply h-4 w-4 mx-1.5 bg-gray-400 rounded-full inline-block cursor-pointer transition-colors duration-300;
}
.dot.active {
  @apply bg-gray-600;
}
.info {
  @apply bg-gray-100 p-2.5 border border-gray-300;
}
.info p {
  @apply my-1.5;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>