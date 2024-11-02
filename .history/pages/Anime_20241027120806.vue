<template>
  <div>
    <section class="showcase">
      <header>
        <div class="toggle"></div>
      </header>
      <!-- 默认静音播放视频 -->
      <video ref="video" :src="videoSrc" muted loop autoplay></video>
      <div class="text">
        <h2>最喜欢的动漫</h2>
        <h3>人生中一部分时间由他们陪伴我渡过</h3>
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
    };
  },
  mounted() {
    const menuToggle = document.querySelector('.toggle');
    const showcase = document.querySelector('.showcase');
    const videoElement = this.$refs.video;

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      showcase.classList.toggle('active');
    });

    // 弹出确认框，询问用户是否播放声音
    const userConfirmed = confirm("是否播放视频声音？");

    if (userConfirmed) {
      videoElement.muted = false;  // 取消静音
      videoElement.volume = 1;     // 设置音量为 100%
    } else {
      videoElement.muted = true;   // 保持静音
    }

    videoElement.play().catch(error => {
      console.error("视频播放失败:", error);
    });
  },
};
</script>

<style scoped>
/* 样式代码保持不变 */
...
</style>



