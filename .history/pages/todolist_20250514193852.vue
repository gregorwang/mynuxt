<template>
  <div class="resume-page">
    <header class="resume-header">
      <h1>您的名字</h1>
      <p>您的职位或简介</p>
      <nav class="contact-info">
        <a href="mailto:your.email@example.com">your.email@example.com</a> |
        <a href="tel:+1234567890">+1234567890</a> |
        <a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a> |
        <a href="https://github.com/yourusername" target="_blank">GitHub</a>
      </nav>
    </header>

    <main class="resume-main">
      <section class="resume-section about-me">
        <h2>关于我</h2>
        <p>在这里写一段关于您自己的简短介绍...</p>
      </section>

      <section class="resume-section experience">
        <h2>工作经历</h2>
        <div class="job">
          <h3>职位名称 - 公司名称</h3>
          <p class="date">开始日期 – 结束日期</p>
          <ul>
            <li>职责或成就 1</li>
            <li>职责或成就 2</li>
          </ul>
        </div>
        <!-- 可以添加更多工作经历 -->
      </section>

      <section class="resume-section education">
        <h2>教育背景</h2>
        <div class="degree">
          <h3>学位 - 学校名称</h3>
          <p class="date">毕业年份</p>
          <p>相关课程或荣誉...</p>
        </div>
      </section>

      <section class="resume-section skills">
        <h2>技能</h2>
        <ul>
          <li>技能 1</li>
          <li>技能 2</li>
          <li>技能 3</li>
        </ul>
      </section>

      <!-- 您可以根据需要添加更多部分，例如项目、证书等 -->
    </main>

    <footer class="resume-footer">
      <p>&copy; {{ new Date().getFullYear() }} 您的名字. 版权所有.</p>
    </footer>
  </div>
</template>

<script setup>
// 如果需要，可以在这里添加 JavaScript 逻辑
</script>

<style scoped>
.resume-page {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.resume-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.resume-header h1 {
  font-size: 2.5em;
  margin-bottom: 0.2em;
  color: #2c3e50;
}

.resume-header p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
}

.contact-info a {
  color: #3498db;
  text-decoration: none;
  margin: 0 5px;
}

.contact-info a:hover {
  text-decoration: underline;
}

.resume-main {
  /* 可以在这里添加主内容区域的样式 */
}

.resume-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.resume-section h2 {
  font-size: 1.8em;
  color: #2980b9;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.job, .degree {
  margin-bottom: 15px;
}

.job h3, .degree h3 {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 5px;
}

.date {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 5px;
}

.resume-section ul {
  list-style-type: disc;
  padding-left: 20px;
}

.resume-section ul li {
  margin-bottom: 5px;
}

.skills ul {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skills ul li {
  background-color: #eaf2f8;
  color: #2c3e50;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
}

.resume-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 0.9em;
  color: #777;
}
</style>