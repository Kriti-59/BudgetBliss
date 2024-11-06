<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 class="navbar-title">BudgetBliss</h1>
      <div class="user-icon" @click="toggleDropdown">
        <i class="fas fa-user"></i>
        <div class="dropdown-menu" :class="{ visible: dropdownVisible }">
          <button class="dropdown-item" @click="showModal = true">
            Logout
          </button>
        </div>
      </div>
    </div>

    <Logout
      v-if="showModal"
      :showModal="showModal"
      @close="showModal = false"
    />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import Logout from "./Logout.vue";

const dropdownVisible = ref(false);
const showModal = ref(false);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};
</script>

<style scoped>
.navbar {
  background-color: #f5f5f5;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.navbar-container {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-title {
  flex: 1;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
}

.user-icon {
  cursor: pointer;
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: none;
}

.dropdown-menu.visible {
  display: block;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  display: block;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
