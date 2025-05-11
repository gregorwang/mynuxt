<template>
  <div class="layout-wrapper">
    <!-- 导航栏 -->
    <nav class="nav-fixed" :class="{ 'nav-scrolled': isScrolled }">
      <div class="nav-container">
        <div class="nav-content">
          <!-- Logo 部分 -->
          <div class="nav-logo">
            <NuxtLink to="/" class="logo-link">
              <img src="/public/test.svg" alt="Logo" class="logo-image" />
             
            </NuxtLink>
          </div>

          <!-- 移动端菜单按钮 -->
          <div class="mobile-menu-btn">
            <button @click="toggleMobileMenu" aria-label="Toggle menu">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 桌面端导航链接 -->
          <ul class="desktop-nav">
            <li>
              <NuxtLink to="/photo" class="nav-link">影像记忆</NuxtLink>
            </li>
            <li class="nav-dropdown">
              <a href="#" class="nav-link">个人兴趣</a>
              <div class="dropdown-menu">
                <ul class="dropdown-list">
                  <li><NuxtLink to="/" class="dropdown-item">最喜欢的游戏</NuxtLink></li>
                  <li><NuxtLink to="/Anime" class="dropdown-item">最喜欢的动漫</NuxtLink></li>
                  <li><NuxtLink to="/streetphotos" class="dropdown-item">最喜欢的电影电视剧</NuxtLink></li>
                </ul>
              </div>
            </li>
            <li>
              <NuxtLink to="/chat" class="nav-link">LLM-ft-person</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/todolist" class="nav-link">Todo List</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin-access" class="nav-link">Admin Access</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <ul class="mobile-menu-list">
        <li><NuxtLink to="/photo" class="mobile-link">影像记忆</NuxtLink></li>
        <li>
          <a href="#" class="mobile-link" @click.prevent="toggleMobileSubmenu">
            个人兴趣 <span class="dropdown-arrow">▼</span>
          </a>
          <ul v-if="isMobileSubmenuOpen" class="mobile-submenu">
            <li><NuxtLink to="/game" class="mobile-sublink">最喜欢的游戏</NuxtLink></li>
            <li><NuxtLink to="/Anime" class="mobile-sublink">最喜欢的动漫</NuxtLink></li>
            <li><NuxtLink to="/dlg" class="mobile-sublink">最喜欢的电影电视剧</NuxtLink></li>
          </ul>
        </li>
        <li><NuxtLink to="/chat" class="mobile-link">LLM-ft-person</NuxtLink></li>
      </ul>
    </div>

    <!-- 主要内容 -->
    <main class="main-content">
      <slot />
    </main>

    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-container">
        <h2 class="footer-title">Gregorwang - 2025 WORLD</h2>
        <p class="footer-copyright">汪家俊个人所有 © Copyright</p>
        <div class="footer-locations">
          <p>中国 山东 青岛</p>
          <span class="location-divider">|</span>
          <p>中国 湖北 鄂州</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isMobileSubmenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  isMobileSubmenuOpen.value = false
}

const toggleMobileSubmenu = () => {
  isMobileSubmenuOpen.value = !isMobileSubmenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 布局基础 */
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.nav-scrolled {
  backdrop-filter: blur(8px);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

/* Logo 样式 */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-image {
  height: 2.5rem;
  width: auto;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

/* 导航链接样式 */
.desktop-nav {
  display: none;
  gap: 2rem;
}

.nav-link {
  color: #333;
  font-size: 1rem;
  padding: 0.5rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #333;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* 下拉菜单样式 */
.nav-dropdown {
  position: relative;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  margin-top: 0.5rem;
}

.nav-dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* 移动端菜单样式 */
.mobile-menu {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 40;
}

.mobile-menu-btn {
  display: block;
}

.mobile-link {
  display: block;
  padding: 0.75rem 0;
  color: #333;
}

.mobile-submenu {
  padding-left: 1.5rem;
}

.mobile-sublink {
  display: block;
  padding: 0.5rem 0;
  color: #666;
}

/* 页脚样式 */
.site-footer {
  background-color: #1a202c;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-copyright {
  color: #cbd5e0;
  margin-bottom: 0.5rem;
}

.footer-locations {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: #a0aec0;
}

.location-divider {
  color: #4a5568;
}

/* 响应式设计 */
@media (min-width: 640px) {
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-btn {
    display: none;
  }
}

@media (max-width: 639px) {
  .footer-locations {
    flex-direction: column;
    gap: 0.5rem;
  }

  .location-divider {
    display: none;
  }
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding-top: 4rem;
}
</style> 