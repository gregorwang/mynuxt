<!-- pages/game.vue -->
<template>
  <div class="relative h-screen w-full overflow-hidden bg-black text-white">
    <!-- 星空粒子画布 -->
    <canvas ref="starCanvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- 主内容 -->
    <div class="relative z-10 flex flex-col h-full">
      <!-- 顶栏 -->
      <header class="flex justify-between items-center px-8 py-4">
        <img :src="iconTt" alt="tt" class="h-6 w-6" />
        <div class="flex space-x-4">
          <img :src="iconEl" alt="el" class="h-6 w-6" />
          <img :src="iconSc" alt="sc" class="h-6 w-6" />
        </div>
      </header>

      <!-- 横向游戏轨道 -->
      <div
        ref="track"
        class="flex-1 flex items-center overflow-x-auto snap-x snap-mandatory px-20 space-x-10"
      >
        <motion.div
          v-for="(g, i) in games"
          :key="g.id"
          :initial="{ scale: 0.9 }"
          :animate="{ scale: index === i ? 1.1 : 0.9 }"
          :transition="{ type: 'spring', stiffness: 250, damping: 25 }"
          class="snap-center shrink-0 w-64 h-96 rounded-3xl overflow-hidden cursor-pointer"
          @click="index = i"
        >
          <img :src="g.cover" class="w-full h-full object-cover" />
        </motion.div>
      </div>

      <!-- 信息面板 -->
      <div class="bg-black/60 backdrop-blur-lg p-6">
        <h2 class="text-2xl font-semibold">{{ games[index].title }}</h2>
        <p class="mt-2 text-sm text-gray-300">{{ games[index].desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ---------- 资源导入 ---------- */
import { ref, reactive, onMounted } from 'vue'
import { useHead } from '#app'
import { motion } from '@vueuse/motion'           // 已在 nuxt.config 中注册
import * as THREE from 'three'                    // CDN 也可：见 onMounted 注释

/* 封面图 & 图标（位于 assets/ 目录） */
import game1 from '@/assets/game1.webp'
import game2 from '@/assets/game2.webp'
import game3 from '@/assets/game3.webp'
import iconTt from '@/assets/tt.svg'
import iconEl from '@/assets/el.svg'
import iconSc from '@/assets/sc.svg'

/* ---------- 游戏数据 ---------- */
interface Game { id: string; title: string; cover: string; desc: string }

const games = reactive<Game[]>([
  { id: 'g1', title: 'Game 1', cover: game1, desc: '示例描述 1' },
  { id: 'g2', title: 'Game 2', cover: game2, desc: '示例描述 2' },
  { id: 'g3', title: 'Game 3', cover: game3, desc: '示例描述 3' },
])
const index = ref(0)

/* ---------- SEO ---------- */
useHead({ title: 'PS5 · 我的游戏' })

/* ---------- 键盘导航 ---------- */
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight' && index.value < games.length - 1) index.value++
    if (e.code === 'ArrowLeft' && index.value > 0) index.value--
  })
})

/* ---------- 星空粒子特效 ---------- */
const starCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  /* 如需 CDN，可在 nuxt.config.ts 的 app.head.script 中引入：
     { src: 'https://unpkg.com/three@0.160.0/build/three.min.js' } */

  const canvas = starCanvas.value!
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5
  renderer.setSize(window.innerWidth, window.innerHeight)

  /* 生成星粒子 */
  const starCnt = 8000
  const positions = new Float32Array(starCnt * 3)
  for (let i = 0; i < starCnt; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 600
    positions[i * 3 + 1] = (Math.random() - 0.5) * 600
    positions[i * 3 + 2] = -Math.random() * 600
  }
  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  /* 响应尺寸变化 */
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  /* 动画循环 */
  const animate = () => {
    requestAnimationFrame(animate)
    stars.rotation.z += 0.0005
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<style scoped>
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>








