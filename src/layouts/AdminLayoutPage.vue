<template>
  <div class="admin-layout">
    <button class="sidebar-toggle d-lg-none" @click="toggleSidebar">
      ☰
    </button>

    <div class="admin-container">
      <AdminSidebarPage :open="sidebarOpen" @close="sidebarOpen = false" />

      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AdminSidebarPage from "./AdminSidebarPage.vue"

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<style scoped>
.admin-layout {
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
}

.admin-container {
  display: flex;
  width: 100%;
}

.sidebar-toggle {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 10px;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
}

@media (min-width: 992px) {
  .sidebar-toggle {
    display: none;
  }
}

.admin-content {
  flex-grow: 1;
  padding: 20px;
  min-height: calc(100vh - 60px);
  overflow-x: auto;
}
</style>
