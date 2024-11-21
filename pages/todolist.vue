<template>
  <div class="todolist-container">
    <!-- 添加加载状态显示 -->
    <div v-if="isLoading" class="loading-state">
      加载中...
    </div>
    
    <!-- 添加错误状态显示 -->
    <div v-if="error" class="error-state">
      {{ error }}
    </div>

    <!-- 顶部区域 -->
    <div class="header" v-motion-slide-top>
      <h1>Todo List</h1>
      <div class="stats">
        <div class="stats-text">
          <span>{{ completedCount }}/{{ todos.length }}</span>
          <span class="stats-label">已完成</span>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${completionRate}%` }"></div>
        </div>
      </div>
    </div>

    <!-- 添加新任务 -->
    <div class="add-todo" v-motion-slide-right>
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        type="text" 
        placeholder="添加新的任务..."
        class="add-input"
      >
      <button @click="addTodo" class="add-button">
        <Icon icon="material-symbols:add-circle" />
      </button>
    </div>

    <!-- 过滤器 -->
    <div class="filters" v-motion-slide-left>
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        :class="{ active: currentFilter === filter.value }"
        @click="currentFilter = filter.value"
        class="filter-button"
      >
        <Icon :icon="filter.icon" />
        {{ filter.label }}
      </button>
    </div>

    <!-- 任务列表 -->
    <TransitionGroup 
      name="list" 
      tag="ul" 
      class="todo-list"
      v-motion-slide-bottom
    >
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id" 
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <div class="todo-content">
          <button 
            @click="toggleTodo(todo.id)" 
            class="checkbox"
            :class="{ checked: todo.completed }"
          >
            <Icon 
              v-if="todo.completed" 
              icon="material-symbols:check" 
              class="check-icon"
            />
          </button>
          <span class="todo-text">{{ todo.text }}</span>
        </div>
        <button @click="deleteTodo(todo.id)" class="delete-button">
          <Icon icon="material-symbols:delete-outline" />
        </button>
      </li>
    </TransitionGroup>

    <!-- 空状态提示 -->
    <div v-if="todos.length === 0" class="empty-state" v-motion-fade>
      <Icon icon="material-symbols:task" class="empty-icon" />
      <p>开始添加你的第一个任务吧</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义基础 URL 和 API 密钥
const BASE_URL = 'http://121.199.73.119:8080//asl/todos/';
const API_KEY = '1234567890';

// 获取所有待办事项
const fetchTodos = async () => {
  try {
    isLoading.value = true;
    console.log('开始获取待办事项...');
    
    // 明确设置所有请求头
    const requestHeaders = {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Accept': 'application/json'
    };
    
    console.log('请求头:', requestHeaders);  // 调试日志
    
    const response = await fetch(BASE_URL, { 
      method: 'GET',
      headers: requestHeaders,  // 使用完整的请求头
      mode: 'cors'  // 明确指定跨域模式
    });
    
    console.log('响应状态:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('错误响应:', errorData);
      throw new Error(`请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('获取到的数据:', data);
    todos.value = Array.isArray(data) ? data : [];
    
  } catch (err) {
    error.value = '获取待办事项失败，请稍后重试';
    console.error('获取待办事项失败:', err);
  } finally {
    isLoading.value = false;
  }
};

// 添加新待办事项
const addTodo = async () => {
  if (!newTodo.value.trim()) return;
  
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        text: newTodo.value.trim(),
        completed: false
      })
    });
    
    const data = await response.json();
    todos.value.unshift(data);
    newTodo.value = '';
  } catch (error) {
    console.error('添加待办事项失败:', error);
  }
};

// 更新待办事项状态
const toggleTodo = async (id: string) => {
  const todo = todos.value.find(t => t.id === id);
  if (!todo) return;

  try {
    // 明确定义请求头
    const requestHeaders = {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      'Accept': 'application/json'
    };

    console.log('发送更新请求:', {
      id,
      currentStatus: todo.completed,
      newStatus: !todo.completed
    });

    const response = await fetch(`${BASE_URL}${id}/`, {
      method: 'PUT',
      headers: requestHeaders,  // 使用明确定义的请求头
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('更新失败:', errorData);
      throw new Error(`更新失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('更新成功:', data);  // 添加成功日志
    
    const index = todos.value.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.value[index] = data;
    }
  } catch (error) {
    console.error('更新待办事项失败:', error);
  }
};

// 删除待办事项
const deleteTodo = async (id: string) => {
  try {
    await fetch(`${BASE_URL}${id}/`, {
      method: 'DELETE',
      headers
    });
    
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('删除待办事项失败:', error);
  }
};

// 计算已完成任务的数量
const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length;
});

// 计算完成任务的比例
const completionRate = computed(() => {
  return (completedCount.value / todos.value.length) * 100 || 0;
});

// 过滤器
const filters = [
  { value: 'all', label: '全部', icon: 'material-symbols:all-out' },
  { value: 'active', label: '未完成', icon: 'material-symbols:check-box-outline-blank' },
  { value: 'completed', label: '已完成', icon: 'material-symbols:check-box' }
];

// 当前过滤条件
const currentFilter = ref('all');

// 根据当前过滤条件过滤待办事项
const filteredTodos = computed(() => {
  if (currentFilter.value === 'active') {
    return todos.value.filter(todo => !todo.completed);
  } else if (currentFilter.value === 'completed') {
    return todos.value.filter(todo => todo.completed);
  } else {
    return todos.value;
  }
});

// 数据绑定
const todos = ref([]);
const newTodo = ref('');
const isLoading = ref(false);

// 初始化时获取待办事项
onMounted(() => {
  console.log('组件挂载，开始获取待办事项');  // 调试日志
  fetchTodos();
});
</script>

<style scoped>
.todolist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4ff 0%, #f9f7ff 100%);
}

/* 样式保持不变，可以根据需求调整 */
</style>

  
  <style scoped>
  .todolist-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f4ff 0%, #f9f7ff 100%);
  }
  
  .header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .stats-text {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .stats-label {
    color: #6b7280;
  }
  
  .progress-bar {
    width: 200px;
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transition: width 0.3s ease;
  }
  
  .add-todo {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .add-input {
    flex: 1;
    padding: 1rem 1.5rem;
    border-radius: 16px;
    border: 2px solid #e5e7eb;
    background-color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .add-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
  
  .add-button {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .add-button:hover {
    transform: scale(1.05);
  }
  
  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
  }
  
  .filter-button {
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .filter-button.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: transparent;
  }
  
  .todo-list {
    list-style: none;
    padding: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  
  .todo-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .checkbox {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 2px solid #e5e7eb;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
  
  .checkbox.checked {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-color: transparent;
  }
  
  .check-icon {
    color: white;
  }
  
  .todo-text {
    font-size: 1.1rem;
  }
  
  .completed .todo-text {
    text-decoration: line-through;
    color: #9ca3af;
  }
  
  .delete-button {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .delete-button:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: #6b7280;
  }
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  /* 动画 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease;
  }
  
  .list-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  /* 响应式设计 */
  @media (max-width: 640px) {
    .todolist-container {
      padding: 1rem;
    }
  
    h1 {
      font-size: 2rem;
    }
  
    .filters {
      flex-wrap: wrap;
    }
  
    .filter-button {
      flex: 1;
      min-width: 100px;
    }
  }
  </style>