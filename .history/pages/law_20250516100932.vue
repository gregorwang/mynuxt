<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 页面头部 -->
    <header class="bg-blue-700 text-white py-8 shadow-md">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold text-center">使用条款与免责声明</h1>
        <p class="text-center mt-2 text-blue-100">生效日期：{{ effectiveDate }}</p>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <!-- 导航目录 -->
        <div class="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 class="text-xl font-semibold mb-4 text-blue-800">目录</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li v-for="(section, index) in sections" :key="index" class="flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-2 text-sm font-medium">{{ index + 1 }}</span>
              <a :href="`#section-${index + 1}`" class="text-blue-700 hover:text-blue-900 hover:underline">{{ section.title }}</a>
            </li>
          </ul>
        </div>

        <!-- 条款内容 -->
        <div class="space-y-8">
          <section v-for="(section, index) in sections" :key="index" :id="`section-${index + 1}`" class="pb-6 border-b border-gray-200">
            <h2 class="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <span class="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-2 text-sm font-medium">{{ index + 1 }}</span>
              {{ section.title }}
            </h2>
            <div class="prose prose-blue max-w-none" v-html="section.content"></div>
          </section>
        </div>

        <!-- 返回顶部按钮 -->
        <div class="fixed bottom-8 right-8">
          <button @click="scrollToTop" class="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- 页脚 --
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 生效日期
const effectiveDate = ref('2024年4月1日');

// 滚动到顶部函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 条款内容
const sections = ref([
  {
    title: '定义',
    content: `
      <p>"本站"：指域名 <a href="http://wangjiajun.asia/" class="text-blue-600 hover:underline" target="_blank">http://wangjiajun.asia/</a> 及其子域名下全部网页、移动端界面与功能。</p>
      <p>"运营者"：汪家俊（中国大陆居民，联系方式见第十三条）。</p>
      <p>"用户"：访问、浏览、上传、下载或以其他方式使用本站之任何个人或组织。</p>
      <p>"内容"：本站呈现或用户上传之文字、图片、音视频、代码、下载文件及其他信息载体。</p>
    `
  },
  {
    title: '接受与变更条款',
    content: `
      <p>您访问或使用即视为同意本条款全部内容。本站有权依据法律政策更新条款，并在显著位置公示，更新后立即生效；若您不同意，应立即停止使用。</p>
    `
  },
  {
    title: '服务说明与合规承诺',
    content: `
      <p>本站为非经营性个人展示网站，仅提供个人原创作品与学习记录之展示，不含付费服务、广告营利或电商交易。</p>
      <p>本站已按《非经营性互联网信息服务备案管理办法》完成ICP备案（备案号：鄂ICP备2025114987号）。</p>
      <p>本站服务器位于中华人民共和国境内，完整落实网络安全等级保护、日志留存不少于 6 个月等技术措施。</p>
    `
  },
  {
    title: '用户行为规范',
    content: `
      <p>用户不得利用本站制作、复制、发布、传播含有法律法规禁止内容的信息（政治有害、色情赌博、暴恐谣言、侵权盗版等）。</p>
      <p>用户发表内容应确保拥有合法权利；因侵权引发纠纷的，由用户自行承担全部责任，并赔偿运营者因此遭受的损失。</p>
      <p>本站发现违法或侵权信息，将依法立即删除并保存记录，向有关主管机关报告。</p>
    `
  },
  {
    title: '知识产权',
    content: `
      <p>本站原创内容：除另有注明外，版权归运营者所有；非商业转载须注明出处及链接，商业使用须事先取得书面授权。</p>
      <p>用户上传内容：用户授予本站全球范围、免费的非独占许可，用于在本站展示、缓存、备份及推广；但不改变其著作权归属。</p>
    `
  },
  {
    title: '个人信息与隐私保护',
    content: `
      <div class="space-y-3">
        <div>
          <h3 class="font-semibold text-blue-700">1. 收集目的与范围</h3>
          <p>仅为基本访问、留言互动及改进站点体验，收集最小必要的浏览日志、IP、浏览器信息及用户主动填写的邮箱/昵称。</p>
        </div>
        <div>
          <h3 class="font-semibold text-blue-700">2. Cookie/本地存储</h3>
          <p>仅使用必要 Cookie实现会话保持与语言偏好；非必要 Cookie 将征得明示同意后方可启用。</p>
        </div>
        <div>
          <h3 class="font-semibold text-blue-700">3. 保存期限</h3>
          <p>个人信息、日志最短保存 6 个月，最长不超过达成处理目的所必需的期限或法律法规要求的留存期。</p>
        </div>
        <div>
          <h3 class="font-semibold text-blue-700">4. 数据跨境</h3>
          <p>本站现无跨境传输；如未来需向境外服务器备份，将按照《数据出境安全评估办法》完成评估并告知用户。</p>
        </div>
        <div>
          <h3 class="font-semibold text-blue-700">5. 用户权利</h3>
          <p>用户可通过第十三条联系方式行使访问、更正、删除、撤回同意等权利；本站将在 15 个工作日内处理。</p>
        </div>
        <div>
          <h3 class="font-semibold text-blue-700">6. 未成年人保护</h3>
          <p>不主动面向未满 14 周岁未成年人收集个人信息；如需收集，将另行取得监护人同意并提供专门保护措施。</p>
        </div>
      </div>
    `
  },
  {
    title: '算法与深度生成内容说明',
    content: `
      <p>本站暂不提供个性化推荐算法；如后续上线，将遵守《互联网信息服务算法推荐管理规定》提供自主关闭、"不感兴趣"等选项。</p>
      <p>如使用 AI 或深度合成技术生成图片/音视频，将显著标签"AI生成"并确保不用于传播虚假信息或侵害他人权益。</p>
    `
  },
  {
    title: '广告与外部链接',
    content: `
      <p>本站无商业广告投放；若未来出现赞助内容，将严格遵守《广告法》显著标识"广告"并确保一键关闭。</p>
      <p>本站可能包含跳转至第三方站点的链接，外部网站内容与隐私政策由该第三方负责，本站不作背书或担保。</p>
    `
  },
  {
    title: '免责条款',
    content: `
      <p>本站内容基于"现状"提供，对其准确性、完整性、时效性不作保证；用户据此操作产生的风险自负。</p>
      <p>因不可抗力、系统故障、网络原因或第三方原因导致服务中断或数据丢失，本站不承担由此引起的赔偿责任。</p>
      <p>对用户发布的观点或内容，本站仅提供信息存储空间服务，不承担编辑审查责任；但有权依法律法规删除。</p>
    `
  },
  {
    title: '投诉与举报',
    content: `
      <p>用户可通过邮箱或电话向运营者反馈违规内容；亦可通过国家网信办"12377"平台进行举报。</p>
      <p>本站将在收到举报后 3 个工作日内处理并反馈结果。</p>
    `
  },
  {
    title: '适用法律与争议解决',
    content: `
      <p>本声明适用中华人民共和国法律。</p>
      <p>因使用本站产生的争议，双方应友好协商；协商不成的，提交运营者住所地（青岛市）人民法院管辖。</p>
    `
  },
  {
    title: '条款的解释、更新与生效',
    content: `
      <p>本条款由运营者负责最终解释。如条款部分条文被认定无效，不影响其他条文之效力。</p>
      <p>本条款自页面顶部标注之生效日期起执行，替代此前所有版本。</p>
    `
  },
  {
    title: '联系我们',
    content: `
      <div class="bg-blue-50 p-4 rounded-lg">
        <p><strong>运营者：</strong>汪家俊</p>
        <p><strong>电子邮箱：</strong><a href="mailto:youcandowhat@qq.com" class="text-blue-600 hover:underline">youcandowhat@qq.com</a></p>
        <p><strong>电话：</strong>(+86) 181-0711-1994</p>
        <p><strong>通信地址：</strong>山东省青岛市城阳区华贯路666号</p>
      </div>
    `
  }
]);
</script>

<style>
/* 可以添加任何额外的自定义样式 */
.prose a {
  @apply text-blue-600 hover:underline;
}

.prose h3 {
  @apply text-lg font-semibold mb-2;
}

html {
  scroll-behavior: smooth;
}
</style>