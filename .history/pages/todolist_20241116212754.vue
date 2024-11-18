<template>
  <div class="todolist-container">
    <!-- Header Section -->
    <div class="header" v-motion-slide-top>
      <h1>Todo List</h1>
      <div class="stats">
        <div class="stats-text">
          <span>{{ completedCount }}/{{ todos.length }}</span>
          <span class="stats-label">Completed</span>
        </div>
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${completionRate}%` }"></div>
        </div>
      </div>
    </div>

    <!-- Add Todo Section -->
    <div class="add-todo" v-motion-slide-right>
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        type="text" 
        placeholder="Add a new task..."
        class="add-input"
      >
      <button @click="addTodo" class="add-button">
        <Icon icon="material-symbols:add-circle" />
      </button>
    </div>

    <!-- Filters Section -->
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

    <!-- Todo List Section -->
    <TransitionGroup 
      name="list" 
      tag="ul" 
      class="todo-list"
      v-motion-slide-bottom
    >
      <li 
        v-for="todo in filteredTodos" 
        :key="todo._id" 
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <div class="todo-content">
          <button 
            @click="toggleTodo(todo._id)" 
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
        <button @click="deleteTodo(todo._id)" class="delete-button">
          <Icon icon="material-symbols:delete-outline" />
        </button>
      </li>
    </TransitionGroup>

    <!-- Empty State Section -->
    <div v-if="todos.length === 0" class="empty-state" v-motion-fade>
      <Icon icon="material-symbols:task" class="empty-icon" />
      <p>Start adding your first task</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const BASE_URL = 'http://127.0.0.1:8000/asl/todos/';

const todos = ref([]);
const newTodo = ref('');
const isLoading = ref(false);
const currentFilter = ref('all'); // Managing current filter
const filters = ref([
  { value: 'all', label: 'All', icon: 'material-symbols:check-circle' },
  { value: 'completed', label: 'Completed', icon: 'material-symbols:check-circle' },
  { value: 'active', label: 'Active', icon: 'material-symbols:check-circle' },
]);

const fetchTodos = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    todos.value = data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  } finally {
    isLoading.value = false;
  }
};

const addTodo = async () => {
  if (!newTodo.value.trim()) return;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    console.error('Failed to add todo:', error);
  }
};

const toggleTodo = async (id) => {
  const todo = todos.value.find(t => t._id === id);
  if (!todo) return;

  try {
    const response = await fetch(`${BASE_URL}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed
      })
    });

    const data = await response.json();
    const index = todos.value.findIndex(t => t._id === id);
    if (index !== -1) {
      todos.value[index] = data;
    }
  } catch (error) {
    console.error('Failed to update todo:', error);
  }
};

const deleteTodo = async (id) => {
  try {
    await fetch(`${BASE_URL}${id}/`, {
      method: 'DELETE'
    });

    todos.value = todos.value.filter(todo => todo._id !== id);
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

const filteredTodos = computed(() => {
  if (currentFilter.value === 'completed') {
    return todos.value.filter(todo => todo.completed);
  } else if (currentFilter.value === 'active') {
    return todos.value.filter(todo => !todo.completed);
  }
  return todos.value;
});

onMounted(() => {
  fetchTodos();
});
</script>

<style scoped>
/* Your existing styles remain the same */
</style>
