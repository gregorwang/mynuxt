<template>
  <t-timeline mode="alternate">
    <t-timeline-item label="2024-07-08">更新上传新的网页</t-timeline-item>
    <t-timeline-item label="2022-07-01">学习seo优化并更新到网站上</t-timeline-item>
    <t-timeline-item label="2024-06-26">学习前端ui框架tdesing，完成开发历史页面的建设</t-timeline-item>
    <t-timeline-item label="2024-06-25">将整个vue3项目转换成nuxt3项目</t-timeline-item>
    <t-timeline-item label="2024-06-22">参照ps5游戏界面完成【爱玩的游戏】页面开发，实际效果有差距，纯手写</t-timeline-item>
    <t-timeline-item label="2024-06-17">学习常见命令行指令</t-timeline-item>
    <t-timeline-item label="2024-06-10">通过学习b站up的动画网页界面制作，完成建设【喜欢看的动漫】网页，代码参考80%，需加强学习</t-timeline-item>
    
    <t-timeline-item label="2024-06-08">MySQL数据库与NODE太难了，浪费太多时间了，放弃该功能维护</t-timeline-item>
    <t-timeline-item label="2024-06-07">之前的问题是当你重新设置好数据库之后，这个通信功能只能坚持5个小时，通过改变提问方式借助gpt改写node.js文件使通信留言功能可以坚持到72小时</t-timeline-item>
    <t-timeline-item label="2024-06-06">排查到MySQL数据库自动删除数据库，通过chatgpt4o还是无法定位到问题</t-timeline-item> 
    <t-timeline-item label="2024-06-05">排查后端通信模块服务器问题</t-timeline-item>
    <t-timeline-item label="2024-05-31">打包vue3项目于上传网站，通过发现访问网站速度过慢加载资源图片时间已经超过3分钟以上体验太差</t-timeline-item> 
    <t-timeline-item label="2024-05-30">完成基础vue3项目开发</t-timeline-item> 
    <t-timeline-item label="2024-05-28">免费试用谷歌云服务器，学习云服务器的必要事项，防火墙端口，密钥</t-timeline-item>
    <t-timeline-item label="2024-05-20">借助chatgpt完成最基础html网页模块设计</t-timeline-item>
    <t-timeline-item label="2024-05-16">通过办理中信美国运通借记卡成功开通chatgpt4O</t-timeline-item>
  </t-timeline>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'rotate'
  }
});
console.log('Page transition:', $pageTransition?.name);
</script>




