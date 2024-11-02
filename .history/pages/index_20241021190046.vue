<template>
  <div>
    <div class="my-component font-sans">
      <div
        class="hero bg-cover bg-center bg-no-repeat w-full h-screen relative text-white text-center transition-all duration-500"
        :style="{ backgroundImage: `url(${images[currentImageIndex].src})` }"
      >
        <div class="nav absolute top-5 right-5 p-2 bg-transparent">
          <ul class="list-none p-0 m-0">
            <li class="inline-block mr-2 relative">
              <NuxtLink to="/history" class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300">开发历史</NuxtLink>
            </li>
            <li class="inline-block mr-2 relative group">
              <a
                href="#"
                class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300"
              >个人兴趣</a>
              <div class="dropdown-content absolute bg-white shadow-md hidden min-w-[160px] group-hover:block">
                <NuxtLink to="/game" class="block text-black py-2 px-4">爱玩的游戏</NuxtLink>
                <NuxtLink to="/anime" class="block text-black py-2 px-4">喜欢看的动漫</NuxtLink> 
                <NuxtLink to="/photo" class="block text-black py-2 px-4">个人相册</NuxtLink>
                <NuxtLink to="/dlg" class="block text-black py-2 px-4">山寨版多邻国日语</NuxtLink>
                <NuxtLink to="/test" class="block text-black py-2 px-4">喜欢听的音乐</NuxtLink>
                <a
                  href="#"
                  @click.prevent="showAlert"
                  class="block text-black py-2 px-4"
                >读书也没读完</a>
                <a
                  href="#"
                  @click.prevent="showAlert"
                  class="block text-black py-2 px-4"
                >基金投资记录</a>
              </div>
            </li>
            <li class="inline-block mr-2 relative">
              <a
                href="#"
                @click.prevent="showAlert"
                class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300"
              >随手记录</a>
            </li>
            <li class="inline-block mr-2 relative">
              <a
                href="#"
                @click.prevent="showAlert"
                class="text-white text-lg font-bold hover:text-yellow-500 transition-colors duration-300"
              >奇怪的想法</a>
            </li>
          </ul>
        </div>
        <div
          class="hero-text absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent p-5"
        >
          <h2 v-html="images[currentImageIndex].text" class="text-4xl"></h2>
        </div>
        <div
          class="dots absolute bottom-5 left-1/2 transform -translate-x-1/2 flex"
        >
          <span
            class="dot h-4 w-4 mx-1.5 bg-gray-400 rounded-full cursor-pointer transition-colors duration-300"
            v-for="(image, index) in images"
            :key="index"
            :class="{ 'bg-gray-600': currentImageIndex === index }"
            @click="changeImage(index)"
          ></span>
        </div>
      </div>
      <div class="title mb-5 relative text-center">
        <div class="block text-sm mb-1 text-white">FOLLOW ME @SOCIAL MEDIA</div>
        <h2 class="text-xl m-0">关注社交媒体上的我</h2>
      </div>
      <dl class="flex justify-center flex-wrap list-none p-0 m-0">
        <dd class="m-2 relative">
          <a href="javascript:;">
            <img
              :src="qqImage"
              alt="QQ"
              class="w-12 h-12 object-cover"
            />
          </a>
          <div
            class="layer hidden absolute top-14 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 border border-gray-300 p-2 z-10 text-center"
          >
            <div class="ewm text-center">
              <div class="img">
                <img
                  :src="qr198"
                  alt="QR Code"
                  class="w-48 h-48"
                />
              </div>
              <div class="name mt-2 text-sm text-gray-800">个人QQ</div>
            </div>
          </div>
        </dd>
        <dd class="m-2 relative">
          <a href="javascript:;">
            <img
              :src="wechatImage"
              alt="WeChat"
              class="w-12 h-12 object-cover"
            />
          </a>
          <div
            class="layer hidden absolute top-14 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 border border-gray-300 p-2 z-10 text-center"
          >
            <div class="ewm text-center">
              <div class="img">
                <img
                  :src="qr125"
                  alt="QR Code"
                  class="w-48 h-48"
                />
              </div>
              <div class="name mt-2 text-sm text-gray-800">个人微信</div>
            </div>
          </div>
        </dd>
        <dd class="m-2 relative">
          <a
            href="https://space.bilibili.com/353753278?spm_id_from=333.999.0.0"
            title="B站"
            target="_blank"
          >
            <img
              :src="biliImage"
              alt="B站"
              class="w-12 h-12 object-cover"
            />
          </a>
        </dd>
        <dd class="m-2 relative">
          <a
            href="https://www.xiaohongshu.com/user/profile/5ffc67a600000000010050f0?xhsshare=CopyLink&appuid=5ffc67a600000000010050f0&apptime=1716641632"
            title="小红书"
            target="_blank"
          >
            <img
              :src="xhsImage"
              alt="小红书"
              class="w-12 h-12 object-cover"
            />
          </a>
        </dd>
      </dl>
    </div>
    <div class="gallery grid gap-0 m-8 p-8 md:grid-cols-4 sm:grid-cols-2">
      <div
        class="gallery-item relative box-border overflow-hidden"
        v-for="(item, index) in galleryItems"
        :key="index"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div
          class="info absolute bottom-2 left-2 bg-black bg-opacity-50 text-white p-1 text-sm"
        >
          <p class="m-0">{{ item.date }}</p>
          <p class="m-0">{{ item.description }}</p>
          <p class="m-0">{{ item.source }}</p>
        </div>
      </div>
    </div>
    <MessageBoard />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '汪家俊的个人网站',
  description: '个人网页练习',
  // ... 其他可能的SEO元数据属性
});

import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';
import MessageBoard from '~/components/MessageBoard.vue'
import qqImage from '~/assets/qq.png'
import wechatImage from '~/assets/wechat.png'
import biliImage from '~/assets/bili.png'
import xhsImage from '~/assets/xhs.png'
import qr198 from '~/assets/198.png'
import qr125 from '~/assets/125.png'
import yhjImage from '~/assets/yhj.jpg'
import pexelsPokRieImage from '~/assets/pexels-pok-rie-33563-2049422.jpg'
import pexelsArnieChouImage from '~/assets/pexels-arnie-chou-304906-1229042.jpg'
import image1 from '~/assets/image1.jpg'
import image2 from '~/assets/image2.png'
import image3 from '~/assets/image3.png'
import image4 from '~/assets/image4.jpg'
import image5 from '~/assets/image5.jpg'
import image6 from '~/assets/image6.jpg'
import { Descriptions } from 'tdesign-vue-next';

const currentImageIndex = ref(0)
const images = ref([
  {
    src: yhjImage,
    text: '本网站云服务器由谷歌公司提供3个月的免费试用，感谢他们，薅完谷歌的羊毛再准备薅aws了',
  },
  {
    src: pexelsPokRieImage,
    text: '该网站主要由chatgpt4o和Gemini 1.5flash完成。<br>"小tips：我只负责复制粘贴，纯手写写不出来"',
  },
  {
    src: pexelsArnieChouImage,
    text: '大模型的能力太夸张了，以后这个失业率都不敢想象。<br>"gregorwang是企业微信的id，icu是最便宜的域名，一年才8元钱."',
  },
])

const galleryItems = ref([
  {
    src: image1,
    alt: 'Image 1',
    date: '03月14日 15:14',
    description: '骑自行车来看胶州湾大桥',
    source: '来源：个人摄影',
  },
  {
    src: image2,
    alt: 'Image 2',
    date: '03月1日 09:13',
    description: '作死在马路中间拍照',
    source: '来源：个人摄影',
  },
  {
    src: image3,
    alt: 'Image 3',
    date: '01月28日 16:07',
    description: '给鸽子吃爽了',
    source: '来源：个人摄影',
  },
  {
    src: image4,
    alt: 'Image 4',
    date: '03月29日 15:31',
    description: '青岛小珠山爬山，很累',
    source: '来源：个人摄影',
  },
  {
    src: image5,
    alt: 'Image 5',
    date: '1月1日 09:29',
    description: '小区的野猫看起来有点哈人',
    source: '来源：个人摄影',
  },
  {
    src: image6,
    alt: 'Image 6',
    date: '2023年11月29日 16:39',
    description: '这就是小米手机的画质！',
    source: '来源：个人摄影',
  },
])

const changeImage = (index) => {
  currentImageIndex.value = index
}

const showAlert = () => {
  alert('正在开发中请耐心等待')
}

// 在页面加载时检查认证状态
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth');
  }
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
</style>
