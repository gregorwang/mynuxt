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
        <button type="submit">留言</button>
      </form>
      <div class="messages" v-if="messages.length">
        <div class="message" v-for="msg in messages" :key="msg.id">
          <div class="avatar">
            <img :src="avatarUrl" alt="Avatar" />
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="username">{{ msg.name }}</span>
              <span class="timestamp"
                >发布于: {{ formatDate(msg.timestamp) }}</span
              >
            </div>
            <div class="message-text">{{ msg.content }}</div>
          </div>
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
      avatarUrl, // 使用导入的头像URL
      backgroundStyle: {
        backgroundImage: `url(${backgroundUrl})`,
      },
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get(
          "http://www.gregorwang.icu/api/messages",
        );
        this.messages = response.data;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    async submitMessage() {
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
        this.fetchMessages();
      } catch (error) {
        console.error("Error submitting message:", error);
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
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

button:hover {
  @apply bg-purple-700;
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
</style>

