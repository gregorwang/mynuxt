<template>
  <div class="flex flex-col items-center justify-center bg-white p-4">
    <!-- 打字机效果的标题 -->
    <h1 class="typing text-2xl font-bold mb-8">有什么可以帮忙的？</h1>

    <!-- 聊天框 -->
    <div ref="chatWindow" class="chatbox w-full max-w-xl border border-gray-300 rounded-lg p-4 h-[600px] overflow-y-auto">
      <div v-for="(message, index) in messages" :key="index" :class="message.role === 'user' ? 'text-right' : 'text-left'">
        <p :class="message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
           class="inline-block px-4 py-2 rounded-lg mb-2 max-w-[80%]">{{ message.content }}</p>
      </div>
      <p v-if="loading" class="text-center text-gray-500">正在输入...</p>
      <p v-if="error" class="text-center text-red-500">{{ error }}</p>
    </div>

    <!-- 输入框和发送按钮 -->
    <div class="w-full max-w-xl flex mt-4">
      <input v-model="inputMessage" @keyup.enter="sendMessage" type="text" placeholder="请输入消息..."
             class="w-full border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-500" />
      <button @click="sendMessage" 
              class="bg-blue-500 text-white px-6 rounded-r-lg hover:bg-blue-600 transition-colors">
        发送
      </button>
    </div>

    <!-- 底部提示信息 -->
    <p class="text-gray-500 text-sm mt-4">ChatGPT 也可能会犯错。请核查重要信息。</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 正确指定使用的布局
definePageMeta({
  layout: 'custom'
})

const messages = ref([
  { role: 'assistant', content: 'Hello! How can I assist you today?' }
])
const inputMessage = ref('')
const loading = ref(false)
const error = ref(null)
const chatWindow = ref(null)

// 发送消息函数
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  messages.value.push({ role: 'user', content: inputMessage.value })
  const userMessage = inputMessage.value
  inputMessage.value = ''
  error.value = null
  loading.value = true

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })

    if (!response.ok) throw new Error('API request failed')

    const data = await response.json()
    messages.value.push({ role: 'assistant', content: data.choices[0].message.content })
  } catch (err) {
    console.error("Error:", err)
    error.value = err.message || 'Request failed. Please try again later.'
  } finally {
    loading.value = false
  }
}

// 滚动聊天框到底部
watch(messages, () => {
  if (chatWindow.value) {
    setTimeout(() => {
      chatWindow.value.scrollTop = chatWindow.value.scrollHeight
    }, 100)
  }
})

onMounted(() => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
})
</script>

<style scoped>
/* 打字机效果 */
.typing {
  border-right: 2px solid black;
  white-space: nowrap;
  overflow: hidden;
  animation: typing 2s steps(20, end), blink 0.5s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  from, to { border-color: transparent; }
  50% { border-color: black; }
}

/* 聊天框样式 */
.chatbox {
  resize: vertical;
}
</style>
