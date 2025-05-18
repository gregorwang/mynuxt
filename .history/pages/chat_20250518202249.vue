<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- 顶部导航栏 -->
    <header class="py-3 px-4 border-b border-gray-200 bg-white">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <div class="flex items-center">
          <img src="/claude-logo.svg" alt="Claude Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-lg font-medium text-gray-800">Claude</h1>
        </div>
        <div class="flex items-center gap-2">
          <button class="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
          <button class="p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <div class="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
      <!-- 欢迎信息 -->
      <div v-if="messages.length <= 1" class="mb-8 text-center py-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">How can I help you today?</h2>
        <p class="text-gray-600 mb-6">I'm Claude, an AI assistant by Anthropic.</p>
        
        <!-- 建议问题 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <button @click="usePresetQuestion('Write a creative story about a time-traveling historian')" 
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-left transition-colors text-sm">
            Write a creative story about a time-traveling historian
          </button>
          <button @click="usePresetQuestion(`Explain quantum computing like I'm 10 years old`)"
  class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-left transition-colors text-sm">
  Explain quantum computing like I'm 10 years old
</button>

          <button @click="usePresetQuestion('I need help drafting a professional email to reschedule a meeting')" 
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-left transition-colors text-sm">
            I need help drafting a professional email to reschedule a meeting
          </button>
          <button @click="usePresetQuestion('Help me plan a 7-day itinerary for Paris')" 
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl text-left transition-colors text-sm">
            Help me plan a 7-day itinerary for Paris
          </button>
        </div>
      </div>

      <!-- 聊天记录区域 -->
      <div ref="chatWindow" class="flex-1 overflow-y-auto space-y-6 mb-6">
        <div v-for="(message, index) in messages" :key="index" 
             class="flex flex-col" 
             :class="message.role === 'user' ? 'items-end' : 'items-start'">
          <!-- 消息标签 -->
          <div class="mb-1 px-2 text-sm text-gray-500">
            {{ message.role === 'user' ? 'You' : 'Claude' }}
          </div>
          
          <!-- 消息内容 -->
          <div :class="[
            'max-w-[90%] rounded-2xl p-4',
            message.role === 'user' 
              ? 'bg-violet-600 text-white' 
              : 'bg-gray-100 text-gray-800'
          ]">
            <p class="whitespace-pre-wrap">{{ message.content }}</p>
          </div>
          
          <!-- 消息底部操作 -->
          <div v-if="message.role === 'assistant' && index > 0" class="mt-2 flex space-x-2">
            <button class="p-1 text-gray-400 hover:text-gray-600 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              Helpful
            </button>
            <button class="p-1 text-gray-400 hover:text-gray-600 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
              </svg>
              Not helpful
            </button>
            <button class="p-1 text-gray-400 hover:text-gray-600 text-xs flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </button>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="loading" class="flex flex-col items-start">
          <div class="mb-1 px-2 text-sm text-gray-500">
            Claude
          </div>
          <div class="bg-gray-100 rounded-2xl p-4 max-w-[90%]">
            <div class="flex items-center space-x-2">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="text-gray-500 text-sm">Thinking...</span>
            </div>
          </div>
        </div>
        
        <!-- 错误提示 -->
        <div v-if="error" class="flex justify-center">
          <div class="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
            {{ error }}
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="border border-gray-200 rounded-xl bg-white shadow-sm">
        <div class="relative">
          <textarea 
            v-model="inputMessage" 
            @keydown.enter.prevent="handleEnter"
            placeholder="Message Claude..." 
            class="w-full p-4 pr-24 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-violet-500 min-h-[60px] max-h-[200px]"
            rows="1"
            ref="textareaRef"
          ></textarea>
          <div class="absolute right-3 bottom-3 flex gap-2">
            <button 
              class="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              title="Upload files"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            <button 
              @click="sendMessage" 
              class="bg-violet-600 text-white p-2 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!inputMessage.trim() || loading"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <div class="px-4 py-2 text-xs text-gray-500 border-t border-gray-200 flex justify-between items-center">
          <span>Press Enter to send</span>
          <span>Shift+Enter for new line</span>
        </div>
      </div>
      
      <!-- 底部提示 -->
      <p class="text-center text-gray-500 text-xs mt-4">
        Claude can make mistakes. Verify important information.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

// 指定使用的布局
definePageMeta({
  layout: 'custom'
})

const messages = ref([
  { role: 'assistant', content: '你好！我是Claude，Anthropic的AI助手。今天有什么我可以帮助你的吗？' }
])
const inputMessage = ref('')
const loading = ref(false)
const error = ref(null)
const chatWindow = ref(null)
const textareaRef = ref(null)

// 自动调整文本区域高度
const adjustTextareaHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${Math.min(textareaRef.value.scrollHeight, 200)}px`
  }
}

watch(inputMessage, () => {
  nextTick(adjustTextareaHeight)
})

// 处理回车键
const handleEnter = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    // 如果按下Shift+Enter，则插入换行符
    const start = textareaRef.value.selectionStart
    const end = textareaRef.value.selectionEnd
    inputMessage.value = inputMessage.value.substring(0, start) + '\n' + inputMessage.value.substring(end)
    nextTick(() => {
      textareaRef.value.selectionStart = textareaRef.value.selectionEnd = start + 1
      adjustTextareaHeight()
    })
  } else {
    // 只有Enter键，发送消息
    sendMessage()
  }
}

// 使用预设问题
const usePresetQuestion = (question: string) => {
  inputMessage.value = question
  nextTick(() => {
    adjustTextareaHeight()
    sendMessage()
  })
}

// 发送消息函数
const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return

  messages.value.push({ role: 'user', content: inputMessage.value })
  const userMessage = inputMessage.value
  inputMessage.value = ''
  error.value = null
  loading.value = true
  
  // 重置textarea高度
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  // 确保聊天窗口滚动到底部
  await scrollToBottom()

  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 实际API调用
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
    await scrollToBottom()
  }
}

// 滚动聊天框到底部
const scrollToBottom = async () => {
  await nextTick()
  if (chatWindow.value) {
    chatWindow.value.scrollTop = chatWindow.value.scrollHeight
  }
}

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.focus()
  }
  scrollToBottom()
})
</script>

<style scoped>
/* 打字指示器动画 */
.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 6px;
  width: 6px;
  margin: 0 1px;
  background-color: #8b5cf6;
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
  background-color: rgba(139, 92, 246, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(139, 92, 246, 0.5);
}

/* 确保textarea不会继承字体样式 */
textarea {
  font-family: inherit;
}
</style>