<template>
    <transition name="rotate">
      <NuxtPage />
    </transition>
  </template>
  

<style>
.rotate-enter-active,
.rotate-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(0, 1, 0, 180deg);
  transform-origin: center;
}
</style>
  