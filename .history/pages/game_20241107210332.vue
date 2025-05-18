<template>
  <div class="bg-gray-100 min-h-screen flex flex-col pb-40">
    <h1 class="text-6xl font-bold gradient-text text-center p-10">最喜欢的游戏</h1>
    <div class="flex-1 m-20 relative">
      <img :src="sekiroConceptArt" alt="no sense" class="w-full h-auto">
      <div class="size-1/3 absolute transform -translate-y-1/3 translate-x-1/3 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <a href="https://www.bilibili.com/video/BV1hY4y1f7Jk/?spm_id_from=333.999.0.0" target="_blank">
          <img :src="sekiro24" alt="no use" class="w-full h-auto">
        </a>
      </div>
      <div class="absolute text-2xl top-[750px] right-60 max-w-[23em] whitespace-normal italic hover:text-custom-yellow2 tracking-wider indent-8">
        《只狼》是我第一个完成全成就的游戏。在玩的过程中，我深刻感受到了游戏的魅力。这款游戏让我意识到我具备一项特别重要的品质——足够的耐心。我相信，只要别人能做到的，我也可以尝试去完成。
      </div>
      <p class="absolute text-sm max-w-[39em] top-[920px] right-60 tracking-wider">
        左侧图片点击跳转bilibili是一个我自己录制的游戏视频，无伤boss需要极高的熟练度和耐心
      </p>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: 'custom'
});
import sekiroConceptArt from '@/assets/Sekiro-conceptart-14.jpg';
import sekiro24 from '@/assets/Sekiro_24.jpg';

export default {
  name: 'GamePage',
  data() {
    return {
      sekiroConceptArt,
      sekiro24,
    };
  },
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 25%, #ec4899 50%, #6366f1 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>







