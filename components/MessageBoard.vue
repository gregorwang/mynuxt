<template>
  <div :style="backgroundStyle" class="bg-cover bg-center min-h-screen">
    <div class="message-board">
      <h1 class="title">留言板</h1>
      <form @submit.prevent="submitMessage" class="message-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" v-model="name" id="username" class="input-field" required />
        </div>
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
              <span class="username">{{ msg.name }}</span>
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

<script>
import avatarUrl from "@/assets/ybtm.jpg";
import backgroundUrl from "@/assets/shab.jpg";

export default {
  data() {
    return {
      name: "",
      message: "",
      messages: [],
      avatarUrl,
      backgroundStyle: {
        backgroundImage: `url(${backgroundUrl})`,
      },
      loading: false,
      loadingMessages: false,
      error: null,
      currentPage: 1,
      itemsPerPage: 5,
      showEmojiPicker: false,
      emojiCurrentPage: 1,
      emojisPerPage: 20, // 每页显示的表情数量
      emojis: [
        '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', 
        '😉', '😍', '🥰', '😘', '😗', '😚', '😋', '😛', '😜', '🤪',
        '😝', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶',
        '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💖',
        '✨', '⭐', '🌟', '💫', '💥', '💢', '💦', '💨', '🕊️', '🎵',
        '🐱', '🐶', '🐼', '🐨', '🦊', '🦁', '🐯', '🐮', '🐷', '🐸',
        '🍎', '🍓', '🍒', '🍕', '🍔', '🍟', '🍖', '🍗', '🍜', '☕'
      ]
    };
  },
  computed: {
    paginatedMessages() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.messages.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.messages.length / this.itemsPerPage);
    },
    emojiTotalPages() {
      return Math.ceil(this.emojis.length / this.emojisPerPage);
    },
    currentPageEmojis() {
      const start = (this.emojiCurrentPage - 1) * this.emojisPerPage;
      const end = start + this.emojisPerPage;
      return this.emojis.slice(start, end);
    }
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      this.loadingMessages = true;
      this.error = null;
      try {
        const response = await $fetch("/api/messages");
        console.log(response); // 调试用，查看 API 返回的数据
        if (response.success) {
          this.messages = response.data;
        } else {
          this.error = response.error;
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        this.error = "无法加载留言，请稍后重试。";
      } finally {
        this.loadingMessages = false;
      }
    },
    async submitMessage() {
      if (!this.name.trim() || !this.message.trim()) {
        this.error = "用户名和留言内容不能为空。";
        return;
      }
      this.loading = true;
      this.error = null;
      const newMessage = {
        name: this.name,
        content: this.message,
      };
      try {
        const response = await $fetch("/api/messages", {
          method: "POST",
          body: newMessage,
        });
        if (response.success) {
          this.name = "";
          this.message = "";
          this.fetchMessages();
        } else {
          this.error = response.error;
        }
      } catch (error) {
        console.error("Error submitting message:", error);
        this.error = "留言提交失败，请稍后重试。";
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
      if (this.showEmojiPicker) {
        this.emojiCurrentPage = 1; // 重置到第一页
      }
    },
    prevEmojiPage() {
      if (this.emojiCurrentPage > 1) {
        this.emojiCurrentPage--;
      }
    },
    nextEmojiPage() {
      if (this.emojiCurrentPage < this.emojiTotalPages) {
        this.emojiCurrentPage++;
      }
    },
    addEmoji(emoji) {
      this.message += emoji;
      this.showEmojiPicker = false;
    },
    handleClickOutside(event) {
      const picker = document.querySelector('.emoji-picker');
      const trigger = document.querySelector('.emoji-trigger');
      
      if (picker && !picker.contains(event.target) && !trigger.contains(event.target)) {
        this.showEmojiPicker = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
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
</style>


