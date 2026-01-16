<template>
  <div class="card border-0 shadow-sm overflow-hidden">
    <div class="card-body p-0">
      <div class="p-4 text-center bg-light bg-opacity-50">
        <div class="position-relative d-inline-block mb-3">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="Profile"
            class="rounded-circle shadow-sm border border-4 border-white"
            style="width: 100px; height: 100px; object-fit: cover;"
          />
          <div
            v-else
            class="rounded-circle shadow-sm border border-4 border-white d-flex align-items-center justify-content-center bg-primary text-white fs-1 fw-bold"
            style="width: 100px; height: 100px;"
          >
            {{ getUserInitials(user) }}
          </div>
          <button
            v-if="showEditAvatar"
            class="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 shadow-sm"
            @click="$emit('edit-avatar')"
            title="Update Profile Picture"
          >
            <i class="bi bi-camera"></i>
          </button>
        </div>
        <h5 class="fw-bold mb-1">{{ user.name }}</h5>
        <p class="text-muted small mb-0">{{ user.email }}</p>
      </div>

      <div class="list-group list-group-flush border-top-0">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="list-group-item list-group-item-action border-0 px-4 py-3 d-flex align-items-center justify-content-between"
          :class="{ 'active-link': $route.path === item.path }"
        >
          <div class="d-flex align-items-center">
            <i :class="[item.icon, 'me-3 fs-5 opacity-75']"></i>
            <span class="fw-medium">{{ item.label }}</span>
          </div>
          <span v-if="item.badge" class="badge bg-primary rounded-pill">{{ item.badge }}</span>
        </RouterLink>

        <button
           class="list-group-item list-group-item-action border-0 px-4 py-3 text-danger d-flex align-items-center"
           @click="$emit('logout')"
        >
           <i class="bi bi-box-arrow-right me-3 fs-5 opacity-75"></i>
           <span class="fw-medium">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({})
  },
  showEditAvatar: {
    type: Boolean,
    default: false
  }
})

defineEmits(['logout', 'edit-avatar'])

const menuItems = computed(() => [
  { path: '/profile', label: 'Profile Information', icon: 'bi bi-person' },
  {
    path: '/orders',
    label: 'My Orders',
    icon: 'bi bi-bag',
    badge: props.user.ordersCount
  },
  {
    path: '/wishlist',
    label: 'Wishlist',
    icon: 'bi bi-heart',
    badge: props.user.wishlistCount
  },
  { path: '/addresses', label: 'Saved Addresses', icon: 'bi bi-geo-alt' },
  { path: '/settings', label: 'Settings', icon: 'bi bi-gear' }
])

const getUserInitials = (u) => {
  if (u.name) return u.name.charAt(0).toUpperCase()
  if (u.email) return u.email.charAt(0).toUpperCase()
  return '?'
}
</script>

<style scoped>
.card {
  border-radius: 16px;
}

.list-group-item {
  transition: all 0.2s ease;
  color: #6c757d;
  margin-bottom: 2px;
}

.list-group-item:hover {
  background-color: #f8f9fa;
  color: var(--bs-primary);
  transform: translateX(4px);
}

.active-link {
  color: var(--bs-primary) !important;
  background-color: rgba(var(--bs-primary-rgb), 0.05) !important;
  border-left: 3px solid var(--bs-primary) !important;
  font-weight: 600;
}

.active-link i {
  opacity: 1 !important;
}

/* Custom scrollbar for future extensibility if needed */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
