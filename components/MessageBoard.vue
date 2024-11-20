<template>
  <div :style="backgroundStyle" class="bg-cover bg-center min-h-screen">
    <div class="message-board">
      <h1 class="title">留言板</h1>
      
      <!-- 如果未登录，显示提示 -->
      <div v-if="!authStore.isAuthenticated" class="login-prompt">
        <p>请先<router-link to="/auth" class="login-link">登录</router-link>后再发送留言</p>
      </div>

      <!-- 登录后显示留言表单 -->
      <form v-else @submit.prevent="submitMessage" class="message-form">
        <div class="form-group">
          <label for="content">留言内容</label>
          <div class="textarea-wrapper">
            <textarea 
              v-model="message" 
              id="content" 
              class="input-field" 
              required
            ></textarea>
            <button 
              type="button" 
              class="emoji-trigger"
              @click="toggleEmojiPicker"
            >
              😊
            </button>
            <!-- 简单的表情选择面板 -->
            <div v-if="showEmojiPicker" class="emoji-picker">
              <!-- 表情显示区域 -->
              <div class="emoji-grid">
                <button 
                  v-for="emoji in currentPageEmojis" 
                  :key="emoji"
                  @click="addEmoji(emoji)"
                  class="emoji-btn"
                >
                  {{ emoji }}
                </button>
              </div>
              <!-- 表情分页控制 -->
              <div class="emoji-pagination">
                <button 
                  @click="prevEmojiPage" 
                  :disabled="emojiCurrentPage === 1"
                  class="emoji-page-btn"
                >
                  ◀
                </button>
                <span class="emoji-page-info">{{ emojiCurrentPage }}/{{ emojiTotalPages }}</span>
                <button 
                  @click="nextEmojiPage"
                  :disabled="emojiCurrentPage === emojiTotalPages"
                  class="emoji-page-btn"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" :disabled="loading" class="submit-btn">
          <span v-if="loading" class="loading-spinner"></span>
          {{ loading ? '提交中...' : '留言' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>

      <div v-if="loadingMessages" class="loading">加载留言中...</div>

      <div class="messages" v-if="messages.length">
        <div class="message" v-for="msg in paginatedMessages" :key="msg.id">
          <div class="avatar">
            <img :src="avatarUrl" alt="Avatar" class="avatar-img" />
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="username">{{ formatPhoneNumber(msg.user_phone) }}</span>
              <span class="timestamp">{{ formatDate(msg.timestamp) }}</span>
            </div>
            <div class="message-text">{{ msg.content }}</div>
          </div>
        </div>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <span>第 {{ currentPage }} 页</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';  // 添加必要的imports
import { useAuthStore } from '~/stores/auth';
import avatarUrl from "@/assets/ybtm.jpg";
import backgroundUrl from "@/assets/shab.jpg";

const authStore = useAuthStore();
const router = useRouter();

// API配置
const BASE_URL = 'http://127.0.0.1:8000/asl/';
const API_KEY = '1234567890';
const MESSAGES_URL = `${BASE_URL}messages/`;

// 响应式变量
const messages = ref([]);
const message = ref('');
const loading = ref(false);
const loadingMessages = ref(false);
const error = ref(null);
const currentPage = ref(1);
const pageSize = ref(5);
const showEmojiPicker = ref(false);
const emojiCurrentPage = ref(1);
const emojisPerPage = 15;

// 背景样式
const backgroundStyle = {
  backgroundImage: `url(${backgroundUrl})`
};

// 计算属性
const totalPages = computed(() => Math.ceil(messages.value.length / pageSize.value));
const paginatedMessages = computed(() => {
  return messages.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

// 表情相关
const emojis = ['😊', '😂', '🤣', '❤️', '😍', '🥰', '😘', '😭', '😅', '😉', '🤔', '😴', '🥺', '😎', '🤗'];
const emojiTotalPages = Math.ceil(emojis.length / emojisPerPage);
const currentPageEmojis = computed(() => {
  const start = (emojiCurrentPage.value - 1) * emojisPerPage;
  return emojis.slice(start, start + emojisPerPage);
});

// 方法
const fetchMessages = async () => {
  loadingMessages.value = true;
  try {
    const csrfToken = getCsrfToken();
    const response = await fetch(MESSAGES_URL, {
      credentials: 'include',
      headers: {
        'X-API-Key': API_KEY.toString(),
        'Accept': 'application/json',
        'X-Phone-Number': authStore.phoneNumber || '',  // 确保即使为空也发送
        'X-CSRFToken': csrfToken || '',  // 确保即使为空也发送
      }
    });
    const result = await response.json();
    if (result.success) {
      messages.value = result.data;
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  } finally {
    loadingMessages.value = false;
  }
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

const addEmoji = (emoji) => {
  message.value += emoji;
};

const prevEmojiPage = () => {
  if (emojiCurrentPage.value > 1) emojiCurrentPage.value--;
};

const nextEmojiPage = () => {
  if (emojiCurrentPage.value < emojiTotalPages) emojiCurrentPage.value++;
};

// 组件挂载时获取消息
onMounted(async () => {
  try {
    // 先查登录状态
    if (!authStore.isAuthenticated) {
      console.log('User not authenticated');
      return;
    }

    console.log('User authenticated with phone:', authStore.phoneNumber); // 添加调试信息

    // 获取 CSRF token
    await fetch(`${BASE_URL}get-csrf-token/`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    await fetchMessages();
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

// 在提交留言前检查登录状态
const submitMessage = async () => {
  if (!authStore.isAuthenticated || !authStore.phoneNumber) {
    alert('请先登录后再发送留言');
    router.push('/auth');
    return;
  }

  console.log('Submitting message with phone:', authStore.phoneNumber); // 添加调试信息

  if (!message.value.trim()) {
    error.value = "留言内容不能为空";
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      // 如果没有 CSRF token，重新获取
      await fetch(`${BASE_URL}get-csrf-token/`, {
        credentials: 'include',
        headers: {
          'X-API-Key': API_KEY.toString(),
          'Accept': 'application/json',
        }
      });
      // 等待一小段时间确保 cookie 已经设置
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const response = await fetch(MESSAGES_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY.toString(),
        'Accept': 'application/json',
        'X-Phone-Number': authStore.phoneNumber,
        'X-CSRFToken': getCsrfToken() || '',
      },
      body: JSON.stringify({
        content: message.value.trim(),
        phone_number: authStore.phoneNumber
      })
    });

    const result = await response.json();
    if (result.success) {
      message.value = "";
      await fetchMessages();
    } else {
      error.value = result.error || '提交失败，请重试';
    }
  } catch (error) {
    console.error("Error submitting message:", error);
    error.value = "留言提交失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};

// 添加获取 CSRF token 的函数
const getCsrfToken = () => {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
};

// 添加手机号格式化函数
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // 显示前3位和后4位，中间用星号代替
  return phone.substring(0, 3) + '****' + phone.substring(7);
};
</script>

<style scoped>
.message-board {
  @apply max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg mt-8 mb-8;
}

.title {
  @apply text-3xl font-bold text-purple-700 mb-8 text-center;
}

.message-form {
  @apply space-y-6 mb-8;
}

.form-group {
  @apply space-y-2;
}

.input-field {
  @apply w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out;
}

textarea.input-field {
  @apply min-h-[120px] resize-y;
}

.submit-btn {
  @apply w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg 
         hover:from-purple-600 hover:to-purple-800 transform hover:-translate-y-0.5 transition duration-200 
         flex items-center justify-center gap-2;
}

.loading-spinner {
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin;
}

.message {
  @apply flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 mb-4;
}

.avatar-img {
  @apply w-12 h-12 rounded-full object-cover border-2 border-purple-200;
}

.message-content {
  @apply flex-1;
}

.message-header {
  @apply flex items-center justify-between mb-2;
}

.username {
  @apply font-semibold text-purple-700;
}

.timestamp {
  @apply text-sm text-gray-500;
}

.message-text {
  @apply text-gray-700 leading-relaxed;
}

.pagination {
  @apply flex justify-center items-center gap-4 mt-8;
}

.pagination button {
  @apply px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition duration-200
         disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed;
}

/* 添加一些画效果 */
.message-enter-active,
.message-leave-active {
  @apply transition-all duration-300;
}

.message-enter-from,
.message-leave-to {
  @apply opacity-0 transform translate-y-4;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .message-board {
    @apply p-4;
  }
  
  .message {
    @apply p-4;
  }
}

.textarea-wrapper {
  @apply relative;
}

.emoji-trigger {
  @apply absolute right-3 bottom-3 text-xl cursor-pointer hover:scale-110 transition-transform duration-200
         bg-transparent border-none p-1 rounded-full hover:bg-gray-100;
}

.emoji-picker {
  @apply absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg p-2 z-50
         border border-gray-200 flex flex-col;
  width: 240px;
}

.emoji-grid {
  @apply grid grid-cols-5 gap-1 mb-2;
}

.emoji-btn {
  @apply p-2 text-xl hover:bg-gray-100 rounded transition-colors duration-200
         cursor-pointer border-none bg-transparent;
}

.emoji-pagination {
  @apply flex items-center justify-center gap-2 pt-2 border-t border-gray-100;
}

.emoji-page-btn {
  @apply px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded
         disabled:opacity-50 disabled:cursor-not-allowed;
}

.emoji-page-info {
  @apply text-sm text-gray-500;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .emoji-picker {
    @apply right-1/2 transform translate-x-1/2;
    width: 200px;
  }
  
  .emoji-btn {
    @apply p-1;
  }
}

/* 添加新的样式 */
.login-prompt {
  @apply text-center py-4 mb-4;
}

.login-link {
  @apply text-purple-600 hover:text-purple-800 underline;
}

/* 可以添加手机号的特殊样式 */
.phone-number {
  @apply text-sm text-gray-600 ml-2;
}
</style>


