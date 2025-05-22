<template>
  <div>
    <div class="my-component font-sans">
      <div
        class="hero bg-cover bg-center bg-no-repeat w-full h-screen relative text-white text-center transition-all duration-500"
        :style="{ backgroundImage: `url(${images[currentImageIndex].src})` }"
      >

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
    <footer class="bg-gray-100 py-3 text-center text-sm text-gray-600 mt-8">
      <div class="container mx-auto flex justify-center items-center space-x-4">
        <a href="/law" class="hover:text-blue-500 transition-colors">法律声明</a>
        <span>|</span>
        <a href="http://beian.miit.gov.cn/" target="_blank" class="hover:text-blue-500 transition-colors">鄂ICP备2025114987号</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '汪家俊的个人网站',
  description: '个人网页练习',
  // ... 其他可能的SEO元数据属性
});
definePageMeta({
  layout: 'custom'
});

import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import MessageBoard from '~/components/MessageBoard.vue'
const qqImage     = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/qq.png"
const wechatImage = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/wechat.png"
const biliImage   = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/bili.png"
const xhsImage    = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/xhs.png"
const qr198       = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/198.png"
const qr125       = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/125.png"
const yhjImage = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/yhj.jpg"
const pexelsPokRieImage = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/pexels-pok-rie-33563-2049422.jpg"
const pexelsArnieChouImage = "https://gregorwang.oss-cn-qingdao.aliyuncs.com/pexels-arnie-chou-304906-1229042.jpg"


const currentImageIndex = ref(0)
const images = ref([
  {
    src: yhjImage,
    text: '由阿里云ecs，oss，cdn，域名提供服务，本网站已完成互联网备案合法合规',
  },
  {
    src: pexelsPokRieImage,
    text: '该网站主要由chatgpt，trae和cursor等aicode软件生成。<br>"小tips：我只负责复制粘贴，纯手写写不出来"',
  },
  {
    src: pexelsArnieChouImage,
    text: '网站建构纯娱乐。<br>"后续可能存在不可抗力原因本网站直接倒闭."',
  },
])

// 添加缺失的galleryItems定义


const changeImage = (index) => {
  currentImageIndex.value = index
}

const showAlert = () => {
  alert('正在开发中请耐心等待')
}

// 在页面加载时检查认证状态
const router = useRouter();
const { user } = useAuth();

onMounted(() => {
  if (!user.value) {
    router.push('/auth');
  }
});
</script>



<style scoped>
.hero {
  background-image: url('https://gregorwang.oss-cn-qingdao.aliyuncs.com/iuo.jpg');
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
  background-image: url('https://gregorwang.oss-cn-qingdao.aliyuncs.com/iuo.jpg');
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