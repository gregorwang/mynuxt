<template>
  <div class="flex flex-col min-h-screen bg-[#f9f9fa]">
    <!-- 顶部标题区域 -->
    <header class="py-4 px-6 border-b border-[#e6e6e9] bg-white">
      <h1 class="text-xl font-medium text-[#1a1a1f]">Claude AI 助手</h1>
    </header>

    <!-- 聊天主体区域 -->
    <div class="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
      <!-- 欢迎信息 -->
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-semibold text-[#1a1a1f] mb-2">有什么可以帮忙的？</h2>
        <p class="text-[#6e6e80]">我可以回答问题、提供信息或帮助您完成任务</p>
      </div>

      <!-- 聊天记录区域 -->
      <div ref="chatWindow" class="flex-1 overflow-y-auto mb-6 space-y-4">
        <div v-for="(message, index) in messages" :key="index" 
             class="flex" 
             :class="message.role === 'user' ? 'justify-end' : 'justify-start'">
          <div :class="[
            'max-w-[85%] rounded-xl p-4',
            message.role === 'user' 
              ? 'bg-[#5436DA] text-white rounded-br-sm' 
              : 'bg-white border border-[#e6e6e9] rounded-bl-sm'
          ]">
            <p :class="message.role === 'user' ? 'text-white' : 'text-[#1a1a1f]'">
              {{ message.content }}
            </p>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-start">
          <div class="bg-white border border-[#e6e6e9] rounded-xl rounded-bl-sm p-4 max-w-[85%]">
            <div class="flex items-center space-x-2">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="text-[#6e6e80]">思考中...</span>
            </div>
          </div>
        </div>
        
        <!-- 错误提示 -->
        <div v-if="error" class="flex justify-center">
          <div class="bg-[#fff2f0] border border-[#ffccc7] rounded-xl p-3 text-[#cf1322] text-sm">
            {{ error }}
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="border border-[#e6e6e9] rounded-xl bg-white">
        <div class="relative">
          <textarea 
            v-model="inputMessage" 
            @keydown.enter.prevent="sendMessage"
            placeholder="输入消息..." 
            class="w-full p-4 pr-16 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#5436DA] min-h-[100px]"
            rows="3"
          ></textarea>
          <button 
            @click="sendMessage" 
            class="absolute right-3 bottom-3 bg-[#5436DA] text-white p-2 rounded-lg hover:bg-[#4A2FB3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!inputMessage.trim() || loading"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div class="px-4 py-2 text-xs text-[#6e6e80] border-t border-[#e6e6e9]">
          按 Enter 发送消息
        </div>
      </div>
      
      <!-- 底部提示 -->
      <p class="text-center text-[#6e6e80] text-xs mt-4">
        AI 助手可能会犯错。请核查重要信息。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// 正确指定使用的布局
definePageMeta({
  layout: 'custom'
})

const messages = ref([
  { role: 'assistant', content: '你好！我是Claude AI助手，有什么我可以帮助你的吗？' }
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

    if (!response.ok) throw new Error('API请求失败')

    const data = await response.json()
    messages.value.push({ role: 'assistant', content: data.choices[0].message.content })
  } catch (err) {
    console.error("Error:", err)
    error.value = err.message || '请求失败，请稍后再试。'
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
/* 打字指示器动画 */
.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  margin: 0 1px;
  background-color: #5436DA;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.4;
}

.typing-indicator span:nth-child(1) {
  animation: pulse 1s infinite 0.1s;
}
.typing-indicator span:nth-child(2) {
  animation: pulse 1s infinite 0.3s;
}
.typing-indicator span:nth-child(3) {
  animation: pulse 1s infinite 0.5s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(84, 54, 218, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(84, 54, 218, 0.5);
}
</style>
