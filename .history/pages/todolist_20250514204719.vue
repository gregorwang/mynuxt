<template>
  <div class="resume-container">
    <!-- 背景动画元素 -->
    <div class="animated-background">
      <div v-for="n in 10" :key="n" class="animated-shape"></div>
    </div>

    <!-- 主要内容 -->
    <div class="resume-content">
      <!-- 个人信息部分 -->
      <header class="resume-header">
        <div class="profile-container">
          <div class="profile-image">
            <img src="~/assets/lkjs.jpg" alt="汪家俊的照片" />
          </div>
          <div class="profile-info">
            <h1 class="gradient-text">汪家俊</h1>
            <p class="subtitle">24岁 男</p>
            <div class="contact-info">
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>18107111994</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>1985738212@qq.com</span>
              </div>
              <div class="contact-item">
                <i class="fab fa-weixin"></i>
                <span>18107111994</span>
              </div>
            </div>
          </div>
        </div>
        <div class="job-intention">
          <h2>求职意向</h2>
          <div class="intention-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>期望地点：青岛市</span>
          </div>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <main class="resume-main">
        <!-- 工作经历 -->
        <section class="resume-section work-experience" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }">
          <div class="section-header">
            <i class="fas fa-briefcase"></i>
            <h2>工作经历</h2>
          </div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3>腾讯云雀</h3>
                <p class="job-title">第一交付中心 | 事中质检QC</p>
                <p class="date">2023年7月 - 至今</p>
                <div class="job-description">
                  <p>2023年7月5日，入职视频号直播电商业务，最初担任事中违禁信息队列质检员。主要负责以下工作：</p>
                  <ul>
                    <li>质检供应商审核出的case</li>
                    <li>日常值班处理客诉复核</li>
                    <li>对行业导师、业务导师反馈的违规直播间进行复核与处罚</li>
                    <li>巡查外部直播间，复核是否存在违规行为</li>
                    <li>针对复核结果，向队列组长输出推动规则完善</li>
                  </ul>
                  <p>2024年1月，转入事中食品专审队列，继续担任质检工作。主要职责包括：</p>
                  <ul>
                    <li>协助队列初期的管理建设包括培训新人，参与规则答疑，统计日常质检数据</li>
                    <li>执行日常质检任务，遵守并认同业务合规流程</li>
                    <li>密切关注抖音电商规则，积极学习前沿电商规则</li>
                    <li>借助ChatGPT、Gemini、Perplexity等大模型工具，以及行业储备知识，进行反向推理，分析现行规则来源和背景逻辑并落地执行</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 教育背景 -->
        <section class="resume-section education" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }">
          <div class="section-header">
            <i class="fas fa-graduation-cap"></i>
            <h2>教育背景</h2>
          </div>
          <div class="education-item">
            <h3>武汉城市学院</h3>
            <p class="degree">护理学 本科</p>
          </div>
        </section>

        <!-- 在校经历 -->
        <section class="resume-section school-experience" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }">
          <div class="section-header">
            <i class="fas fa-university"></i>
            <h2>在校经历</h2>
          </div>
          <div class="school-exp-item">
            <h3>社会实践</h3>
            <p class="exp-title">武汉大学中南医院护理实习</p>
            <ul>
              <li>学习并了解相关医学知识，熟悉医院环境</li>
              <li>跟随所分配的带教老师，学习护理知识，为病人带来规范的护理</li>
              <li>与病人沟通交流，缓解病人压力</li>
              <li>参加科室会议，学习相关DRG，医保政策，pi试验项目的具体情况</li>
              <li>了解医院相关管理流程</li>
            </ul>
          </div>
        </section>

        <!-- 职业技能 -->
        <section class="resume-section skills" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 800 } }">
          <div class="section-header">
            <i class="fas fa-tools"></i>
            <h2>职业技能</h2>
          </div>
          <div class="skills-container">
            <div class="skill-item">
              <div class="skill-name">英语六级技能证书</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 90%"></div>
              </div>
              <div class="skill-label">熟练</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">熟练掌握办公软件WPS</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 90%"></div>
              </div>
              <div class="skill-label">熟练</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">MS Office</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 90%"></div>
              </div>
              <div class="skill-label">熟练</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">C2驾驶证</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 60%"></div>
              </div>
              <div class="skill-label">一般</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">人工呼吸、胸外心脏按压等</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 90%"></div>
              </div>
              <div class="skill-label">熟练</div>
            </div>
            <div class="skill-item">
              <div class="skill-name">ChatGPT</div>
              <div class="skill-level">
                <div class="skill-progress" style="width: 90%"></div>
              </div>
              <div class="skill-label">熟练</div>
            </div>
          </div>
        </section>

        <!-- 资格证书 -->
        <section class="resume-section certificates" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 1000 } }">
          <div class="section-header">
            <i class="fas fa-certificate"></i>
            <h2>资格证书</h2>
          </div>
          <div class="certificate-item">
            <div class="certificate-icon">
              <i class="fas fa-award"></i>
            </div>
            <div class="certificate-info">
              <h3>英语六级</h3>
            </div>
          </div>
        </section>

        <!-- 兴趣爱好 -->
        <section class="resume-section hobbies" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 1200 } }">
          <div class="section-header">
            <i class="fas fa-heart"></i>
            <h2>兴趣爱好</h2>
          </div>
          <div class="hobbies-container">
            <div class="hobby-item">
              <div class="hobby-icon">
                <i class="fas fa-gamepad"></i>
              </div>
              <div class="hobby-name">单机游戏</div>
            </div>
            <div class="hobby-item">
              <div class="hobby-icon">
                <i class="fas fa-bicycle"></i>
              </div>
              <div class="hobby-name">骑自行车</div>
            </div>
          </div>
        </section>

        <!-- 自我评价 -->
        <section class="resume-section self-evaluation" v-motion :initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 1400 } }">
          <div class="section-header">
            <i class="fas fa-user"></i>
            <h2>自我评价</h2>
          </div>
          <div class="evaluation-content">
            <p>作为一个责任心强的员工，我始终对工作保持高度负责。与同事之间保持良好的沟通，善于协作，积极营造和谐的团队氛围。同时，我热衷于学习新知识，特别注重深入理解和掌握行业前沿动态。工作中始终保持耐心与细心，确保任务的高效执行与质量的持续提升。</p>
          </div>
        </section>
      </main>

      <footer class="resume-footer">
        <p>© {{ new Date().getFullYear() }} 汪家俊 - 个人简历</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
// 导入必要的库和组件
import { onMounted } from 'vue';

// 页面加载完成后的动画效果
onMounted(() => {
  // 可以在这里添加额外的动画初始化逻辑
  animateShapes();
});

// 背景动画形状的随机移动
function animateShapes() {
  const shapes = document.querySelectorAll('.animated-shape');
  
  shapes.forEach(shape => {
    // 为每个形状设置随机的初始位置和动画参数
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomDelay = Math.random() * 5;
    const randomDuration = 15 + Math.random() * 10;
    
    shape.style.left = `${randomX}%`;
    shape.style.top = `${randomY}%`;
    shape.style.animationDelay = `${randomDelay}s`;
    shape.style.animationDuration = `${randomDuration}s`;
  });
}
</script>

<style scoped>
/* 基础样式 */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --accent-color: #e74c3c;
  --text-color: #333;
  --light-text: #777;
  --background-color: #f9f9f9;
  --card-background: #fff;
  --border-color: #eee;
  --shadow-color: rgba(0, 0, 0, 0.1);
  --gradient-start: #3498db;
  --gradient-end: #2ecc71;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

/* 容器样式 */
.resume-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* 背景动画 */
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.animated-shape {
  position: absolute;
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1));
  border-radius: 50%;
  animation: floatAnimation 20s infinite alternate ease-in-out;
}

@keyframes floatAnimation {
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(100px, 50px) rotate(90deg) scale(1.2);
  }
  50% {
    transform: translate(50px, 100px) rotate(180deg) scale(0.8);
  }
  75% {
    transform: translate(-50px, 50px) rotate(270deg) scale(1.1);
  }
  100% {
    transform: translate(0, 0) rotate(360deg) scale(1);
  }
}

/* 主要内容样式 */
.resume-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 头部样式 */
.resume-header {
  margin-bottom: 40px;
  padding: 30px;
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.resume-header:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.profile-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30px;
  border: 3px solid var(--primary-color);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.3);
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.gradient-text {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: gradientAnimation 5s infinite alternate;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.subtitle {
  font-size: 1.2rem;
  color: var(--light-text);
  margin-bottom: 15px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.contact-item i {
  margin-right: 8px;
  color: var(--primary-color);
}

.job-intention {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.job-intention h2 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.intention-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.intention-item i {
  margin-right: 8px;
  color: var(--primary-color);
}

/* 主要内容区域样式 */
.resume-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

/* 部分通用样式 */
.resume-section {
  padding: 30px;
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.resume-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border-color);
}

.section-header i {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 10px;
}

.section-header h2 {
  font-size: 1.8rem;
  color: var(--primary-color);
}

/* 工作经历样式 */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: var(--primary-color);
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-dot {
  position: absolute;
  left: -39px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 3px solid var(--card-background);
}

.timeline-content {
  padding-bottom: 20px;
}

.timeline-content h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 5px;
}

.job-title {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.date {
  font-size: 0.9rem;
  color: var(--light-text);
  margin-bottom: 15px;
}

.job-description p {
  margin-bottom: 10px;
}

.job-description ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.job-description li {
  margin-bottom: 5px;
}

/* 教育背景样式 */
.education-item h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 5px;
}

.degree {
  font-size: 1.1rem;
  color: var(--primary-color);
}

/* 在校经历样式 */
.school-exp-item h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 5px;
}

.exp-title {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.school-exp-item ul {
  padding-left: 20px;
}

.school-exp-item li {
  margin-bottom: 5px;
}

/* 技能样式 */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.skill-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.skill-name {
  font-size: 1rem;
  margin-bottom: 5px;
}

.skill-level {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
  border-radius: 4px;
  transition: width 1.5s ease-in-out;
}

.skill-label {
  font-size: 0.8rem;
  color: var(--light-text);
  align-self: flex-end;
}

/* 证书样式 */
.certificate-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.certificate-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(52, 152, 219, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.certificate-icon i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.certificate-info h3 {
  font-size: 1.2rem;
  color: var(--text-color);
}

/* 兴趣爱好样式 */
.hobbies-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.hobby-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.hobby-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(52, 152, 219, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.hobby-item:hover .hobby-icon {
  transform: scale(1.1);
  background-color: rgba(52, 152, 219, 0.2);
}

.hobby-icon i {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.hobby-name {
  font-size: 0.9rem;
  text-align: center;
}

/* 自我评价样式 */
.evaluation-content {
  line-height: 1.8;
}

/* 页脚样式 */
.resume-footer {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
  color: var(--light-text);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-image {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .contact-info {
    justify-content: center;
  }
  
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .hobbies-container {
    justify-content: center;
  }
}

/* 添加 Font Awesome 图标支持 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>