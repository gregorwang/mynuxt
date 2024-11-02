<!-- pages/chat.vue -->

<template>
  <div class="chat-container">
    <h1>ChatGPT Clone</h1>
    <div class="chat-window" ref="chatWindow">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="input-form">
      <input
        v-model="inputMessage"
        type="text"
        placeholder="Type your message..."
        :disabled="loading"
      />
      <button type="submit" :disabled="loading || !inputMessage.trim()">Send</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const messages = ref([
  { role: 'assistant', content: 'Hello! How can I assist you today?' }
])
const inputMessage = ref('')
const loading = ref(false)
const error = ref(null)
const chatWindow = ref(null)

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  // Add user message
  messages.value.push({ role: 'user', content: inputMessage.value })
  const userMessage = inputMessage.value
  inputMessage.value = ''
  error.value = null
  loading.value = true

  try {
    // 使用 fetch 请求 API 路由
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })

    if (!response.ok) throw new Error('API 请求失败')

    const data = await response.json()
    messages.value.push({ role: 'assistant', content: data.choices[0].message.content })
  } catch (err) {
    console.error("Fetch 错误:", err)
    error.value = err.message || '请求错误，请稍后再试。'
  } finally {
    loading.value = false
  }
}

// 自动滚动到最新消息
watch(messages, () => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
})

onMounted(() => {
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
})
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.chat-window {
  height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.message {
  margin-bottom: 15px;
  display: flex;
}

.message.assistant {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-content {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #e1f5fe;
  position: relative;
}

.message.user .message-content {
  background-color: #c8e6c9;
}

.input-form {
  display: flex;
  margin-top: 15px;
}

.input-form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-form button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.input-form button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.error {
  margin-top: 10px;
  color: red;
  text-align: center;
}
</style>
