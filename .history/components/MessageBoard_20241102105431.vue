<template>
  <div :style="backgroundStyle" class="bg-cover bg-center min-h-screen">
    <div class="message-board">
      <h1>留言板</h1>
      <form @submit.prevent="submitMessage">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" v-model="name" id="username" required />
        </div>
        <div class="form-group">
          <label for="content">留言内容</label>
          <textarea v-model="message" id="content" required></textarea>
        </div>
        <button type="submit" :disabled="loading">{{ loading ? '提交中...' : '留言' }}</button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>

      <div v-if="loadingMessages" class="loading">加载留言中...</div>

      <div class="messages" v-if="messages.length">
        <div class="message" v-for="msg in paginatedMessages" :key="msg.id">
          <div class="avatar">
            <img :src="avatarUrl" alt="Avatar" />
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="username">{{ msg.name }}</span>
              <span class="timestamp">发布于: {{ formatDate(msg.timestamp) }}</span>
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
import axios from "axios";
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
      pageSize: 5, // 每页显示的留言数
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.messages.length / this.pageSize);
    },
    paginatedMessages() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.messages.slice(start, start + this.pageSize);
    },
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      this.loadingMessages = true;
      this.error = null;
      try {
        const response = await axios.get("http://www.gregorwang.icu/api/messages");
        this.messages = response.data;
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
        await axios.post("http://www.gregorwang.icu/api/messages", newMessage, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.name = "";
        this.message = "";
        this.fetchMessages(); // 重新获取留言列表
      } catch (error) {
        console.error("Error submitting message:", error);
        this.error = "留言提交失败，请稍后重试。";
      } finally {
        this.loading = false;
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
  },
};
</script>

<style scoped>
.message-board {
  @apply max-w-xl mx-auto p-5 bg-gray-100 rounded-lg shadow-md font-sans;
}

h1 {
  @apply text-center text-gray-700;
}

.form-group {
  @apply mb-4;
}

form {
  @apply flex flex-col;
}

label {
  @apply mb-2 text-gray-700;
}

input,
textarea {
  @apply p-2 border border-gray-300 rounded-md text-base;
}

button {
  @apply self-center py-2 px-4 border-none rounded-md bg-purple-600 text-white text-base cursor-pointer transition-colors duration-300;
}

button:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}

button:hover:enabled {
  @apply bg-purple-700;
}

.error-message {
  @apply text-red-500 text-center mt-2;
}

.loading {
  @apply text-center text-gray-500;
}

.messages {
  @apply mt-5;
}

.message {
  @apply flex p-4 mb-4 bg-white rounded-lg shadow-md;
}

.avatar img {
  @apply rounded-full w-12 h-12 mr-4;
}

.message-content {
  @apply flex-grow;
}

.message-header {
  @apply flex justify-between items-center mb-1;
}

.username {
  @apply font-bold text-gray-700;
}

.timestamp {
  @apply text-xs text-gray-500;
}

.message-text {
  @apply text-gray-700;
}

.pagination {
  @apply flex justify-center items-center mt-4 gap-4;
}

.pagination button {
  @apply py-1 px-3 rounded bg-purple-600 text-white cursor-pointer;
}

.pagination button:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}

.pagination span {
  @apply text-gray-700;
}
</style>

