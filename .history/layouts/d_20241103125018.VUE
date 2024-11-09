<template>
    <nav class="navbar flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div class="flex items-center">
        <NuxtLink to="/photo" class="flex items-center">
          <img src="/public/test.svg" alt="Logo" class="h-10 w-auto mr-3" />
          <span class="text-xl font-semibold">影像记忆</span>
        </NuxtLink>
      </div>
      <ul class="flex space-x-6">
        <li>
          <NuxtLink to="/" class="text-gray-700 hover:text-black transition-colors duration-300">影像记忆</NuxtLink>
        </li>
        <li class="relative group">
          <a href="#" class="text-gray-700 hover:text-black transition-colors duration-300">个人兴趣</a>
          <div class="dropdown-content absolute left-0 top-full mt-2 hidden group-hover:block bg-white shadow-md border border-gray-200">
            <ul class="py-2">
              <li>
                <NuxtLink to="/game" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">最喜欢的游戏</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/Anime" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">最喜欢的动漫</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/dlg" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">最喜欢的电影电视剧</NuxtLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <NuxtLink to="/ideas" class="text-gray-700 hover:text-black transition-colors duration-300">奇思妙想</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/chat" class="text-gray-700 hover:text-black transition-colors duration-300">LLM-ft-person</NuxtLink>
        </li>
      </ul>
      <div>
        <a href="#" class="text-gray-700 hover:text-black">
          <i class="fas fa-shopping-cart"></i>
        </a>
      </div>
    </nav>
  </template>
  
  <script setup>
  // No specific JavaScript required for this layout, but you can add necessary imports here.
  </script>
  
  <style scoped>
  .navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .dropdown-content {
    min-width: 180px;
    z-index: 50;
  }
  </style>
  