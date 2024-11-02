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
      const response = await $fetch('/api/chat', {
        method: 'POST',
        body: { message: userMessage }
      })
  
      messages.value.push({ role: 'assistant', content: response.reply })
    } catch (err) {
      error.value = err?.data?.statusMessage || 'An error occurred.'
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
  