<template>
  <div class="container">
    <div v-if="questions && questions.length > 0">
      <!-- 加载人物图片 -->
      <img :src="characterImage" alt="Character" class="character-image" />
      
      <h2>{{ questions[currentQuestionIndex].question }}</h2>

      <!-- 播放读音 -->
      <audio ref="audio" :src="questions[currentQuestionIndex].audio" autoplay></audio>

      <div class="options">
        <button
          v-for="(option, index) in questions[currentQuestionIndex].options"
          :key="index"
          class="option-btn"
          @click="selectOption(option)"
          :disabled="feedback !== ''"
        >
          {{ option }}
        </button>
      </div>
      <div class="feedback" v-if="feedback">
        {{ feedback }}
      </div>
      <button v-if="feedback" @click="nextQuestion" class="next-btn">下一题</button>
    </div>
    <div v-else>
      <h2>加载中...</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义响应式状态
const questions = ref([])
const currentQuestionIndex = ref(0)
const feedback = ref('')
const characterImage = ref('/assets/character.png')  // 替换成人物图片的路径

// 异步获取问题数据
const fetchQuestions = async () => {
  try {
    const response = await fetch('/api/questions')
    questions.value = await response.json()
  } catch (error) {
    console.error('获取问题数据时出错:', error)
  }
}

// 生命周期钩子函数：页面加载后调用
onMounted(() => {
  fetchQuestions()
})

// 选择选项的逻辑
const selectOption = (selectedOption) => {
  const correctAnswer = questions.value[currentQuestionIndex.value].answer
  if (selectedOption === correctAnswer) {
    feedback.value = '正确！'
  } else {
    feedback.value = `错误！正确答案是 ${correctAnswer}`
  }
}

// 处理下一题
const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    feedback.value = ''
    // 播放下一题的音频
    const audioElement = document.querySelector('audio')
    audioElement.play()
  } else {
    feedback.value = '你已完成所有问题！'
  }
}
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  margin: auto;
  margin-top: 50px;
}

.character-image {
  width: 100px;
  margin-bottom: 20px;
}

.option-btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.option-btn:hover {
  background-color: #17a44d;
}

.next-btn {
  padding: 10px 20px;
  background-color: #1db954;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.feedback {
  margin: 20px 0;
  font-size: 18px;
  color: green;
}
</style>
