<template>
  <div class="container py-5">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-lg-3 mb-5 mb-lg-0">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="text-center mb-4">
              <div class="position-relative d-inline-block">
                <img
                  :src="user.avatar || 'https://via.placeholder.com/150'"
                  alt="Profile"
                  class="rounded-circle border border-4 border-primary"
                  style="width: 120px; height: 120px; object-fit: cover;"
                />
                <button
                  class="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
                  @click="showAvatarUpload = true"
                >
                  <i class="bi bi-camera"></i>
                </button>
              </div>
              <h5 class="mt-3 mb-0">{{ user.name }}</h5>
              <p class="text-muted small">{{ user.email }}</p>
              <span class="badge bg-success">
                <i class="bi bi-shield-check me-1"></i>Verified
              </span>
            </div>

            <div class="list-group list-group-flush">
              <RouterLink
                to="/profile"
                class="list-group-item list-group-item-action border-0 active"
              >
                <i class="bi bi-person me-2"></i>Profile Information
              </RouterLink>
              <RouterLink
                to="/orders"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-bag me-2"></i>My Orders
                <span class="badge bg-primary float-end">{{ user.ordersCount }}</span>
              </RouterLink>
              <RouterLink
                to="/addresses"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-geo-alt me-2"></i>Saved Addresses
              </RouterLink>
              <RouterLink
                to="/wishlist"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-heart me-2"></i>Wishlist
                <span class="badge bg-danger float-end">{{ user.wishlistCount }}</span>
              </RouterLink>
              <RouterLink
                to="/settings"
                class="list-group-item list-group-item-action border-0"
              >
                <i class="bi bi-gear me-2"></i>Settings
              </RouterLink>
              <button
                class="list-group-item list-group-item-action border-0 text-danger"
                @click="logout"
              >
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9">
        <!-- Profile Header -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 class="fw-bold mb-0">Profile Information</h4>
                <p class="text-muted mb-0">Manage your personal information</p>
              </div>
              <button
                class="btn btn-primary"
                @click="editMode = !editMode"
              >
                <i class="bi" :class="editMode ? 'bi-x-lg' : 'bi-pencil'"></i>
                {{ editMode ? 'Cancel' : 'Edit Profile' }}
              </button>
            </div>

            <!-- Edit Avatar Modal -->
            <div v-if="showAvatarUpload" class="modal fade show d-block" style="background: rgba(0,0,0,0.5)">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Update Profile Picture</h5>
                    <button type="button" class="btn-close" @click="showAvatarUpload = false"></button>
                  </div>
                  <div class="modal-body">
                    <div class="text-center">
                      <div class="mb-4">
                        <img
                          :src="avatarPreview || user.avatar"
                          alt="Preview"
                          class="rounded-circle border"
                          style="width: 150px; height: 150px; object-fit: cover;"
                        />
                      </div>
                      <input
                        type="file"
                        ref="avatarInput"
                        accept="image/*"
                        class="form-control"
                        @change="handleAvatarUpload"
                      />
                      <small class="text-muted d-block mt-2">
                        Recommended: Square image, max 2MB
                      </small>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showAvatarUpload = false">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-primary" @click="saveAvatar">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="saveProfile" class="mt-4">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name"
                    :readonly="!editMode"
                    :class="{ 'bg-light': !editMode }"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="formData.email"
                    :readonly="!editMode"
                    :class="{ 'bg-light': !editMode }"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    v-model="formData.phone"
                    :readonly="!editMode"
                    :class="{ 'bg-light': !editMode }"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Date of Birth</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="formData.dob"
                    :readonly="!editMode"
                    :class="{ 'bg-light': !editMode }"
                  />
                </div>
                <div class="col-12 mb-3">
                  <label class="form-label">Address</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    v-model="formData.address"
                    :readonly="!editMode"
                    :class="{ 'bg-light': !editMode }"
                  ></textarea>
                </div>
              </div>

              <!-- Save Button (Visible only in edit mode) -->
              <div v-if="editMode" class="d-flex justify-content-end gap-3 mt-4">
                <button type="button" class="btn btn-outline-secondary" @click="cancelEdit">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-check-circle me-2"></i>Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Account Stats -->
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="text-primary mb-3">
                  <i class="bi bi-bag display-6"></i>
                </div>
                <h3 class="fw-bold">{{ user.ordersCount }}</h3>
                <p class="text-muted mb-0">Total Orders</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="text-success mb-3">
                  <i class="bi bi-currency-dollar display-6"></i>
                </div>
                <h3 class="fw-bold">{{ formatCurrency(user.totalSpent) }}</h3>
                <p class="text-muted mb-0">Total Spent</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="text-warning mb-3">
                  <i class="bi bi-star display-6"></i>
                </div>
                <h3 class="fw-bold">{{ user.reviewsCount }}</h3>
                <p class="text-muted mb-0">Reviews</p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center p-4">
                <div class="text-danger mb-3">
                  <i class="bi bi-heart display-6"></i>
                </div>
                <h3 class="fw-bold">{{ user.wishlistCount }}</h3>
                <p class="text-muted mb-0">Wishlist Items</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card border-0 shadow-sm mt-4">
          <div class="card-body p-4">
            <h5 class="fw-bold mb-4">
              <i class="bi bi-clock-history me-2"></i>Recent Activity
            </h5>
            <div class="timeline">
              <div v-for="activity in recentActivities" :key="activity.id" class="timeline-item">
                <div class="timeline-marker">
                  <i class="bi" :class="activity.icon"></i>
                </div>
                <div class="timeline-content">
                  <h6 class="fw-semibold">{{ activity.title }}</h6>
                  <p class="text-muted small mb-1">{{ activity.description }}</p>
                  <small class="text-muted">{{ formatDate(activity.date) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User Data
const user = reactive({
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  dob: '1990-01-15',
  address: '123 Main Street, New York, NY 10001',
  avatar: 'https://via.placeholder.com/150',
  ordersCount: 12,
  totalSpent: 2450.75,
  reviewsCount: 8,
  wishlistCount: 5
})

// Form Data
const formData = reactive({ ...user })
const editMode = ref(false)
const showAvatarUpload = ref(false)
const avatarPreview = ref('')
const avatarInput = ref(null)

// Recent Activities
const recentActivities = ref([
  { id: 1, title: 'Order Placed', description: 'Order #ORD-78945 was placed successfully', date: '2024-01-15T10:30:00', icon: 'bi-bag-check' },
  { id: 2, title: 'Product Review', description: 'You reviewed "Wireless Headphones"', date: '2024-01-14T15:20:00', icon: 'bi-star' },
  { id: 3, title: 'Profile Updated', description: 'Your profile information was updated', date: '2024-01-13T09:15:00', icon: 'bi-person' },
  { id: 4, title: 'Added to Wishlist', description: 'Smart Watch added to your wishlist', date: '2024-01-12T14:45:00', icon: 'bi-heart' },
  { id: 5, title: 'Order Delivered', description: 'Order #ORD-78940 was delivered', date: '2024-01-11T11:00:00', icon: 'bi-truck' }
])

onMounted(() => {
  // Load user data from localStorage or API
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    Object.assign(user, JSON.parse(savedUser))
    Object.assign(formData, user)
  }
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const saveProfile = () => {
  Object.assign(user, formData)
  localStorage.setItem('user', JSON.stringify(user))
  editMode.value = false

  // Show success message
  showNotification('Profile updated successfully!', 'success')
}

const cancelEdit = () => {
  Object.assign(formData, user)
  editMode.value = false
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveAvatar = () => {
  if (avatarPreview.value) {
    user.avatar = avatarPreview.value
    localStorage.setItem('user', JSON.stringify(user))
    showAvatarUpload.value = false
    showNotification('Profile picture updated!', 'success')
  }
}

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('user')
    router.push('/auth')
  }
}

const showNotification = (message) => {
  // You can implement a toast notification system here
  alert(message)
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.list-group-item {
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
  padding-left: 1.5rem;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e9ecef;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -30px;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0d6efd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.timeline-content {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #0d6efd;
}

.modal {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 20px;
  }

  .timeline-marker {
    left: -20px;
    width: 16px;
    height: 16px;
  }
}
</style>
