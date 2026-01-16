<template>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-lg-3">
        <ProfileSidebar
          :user="user"
          :show-edit-avatar="true"
          @logout="logout"
          @edit-avatar="showAvatarUpload = true"
        />
      </div>

      <div class="col-lg-9">
        <!-- Profile Header -->
        <div class="card border-0 shadow-sm mb-4 overflow-hidden">
          <div class="card-body p-4 p-lg-5">
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
              <div>
                <h2 class="fw-bold mb-1">Profile Information</h2>
                <p class="text-muted mb-0">Manage your personal information and preferences.</p>
              </div>
              <button
                class="btn btn-primary px-4 rounded-pill"
                @click="editMode = !editMode"
              >
                <i class="bi" :class="editMode ? 'bi-x-lg' : 'bi-pencil'"></i>
                <span class="ms-2">{{ editMode ? 'Cancel Editing' : 'Edit Profile' }}</span>
              </button>
            </div>

            <form @submit.prevent="saveProfile">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="fullName"
                      placeholder="Full Name"
                      v-model="formData.name"
                      :readonly="!editMode"
                      :class="{ 'bg-light': !editMode, 'border-0': !editMode }"
                    />
                    <label for="fullName">Full Name</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="name@example.com"
                      v-model="formData.email"
                      :readonly="!editMode"
                      :class="{ 'bg-light': !editMode, 'border-0': !editMode }"
                    />
                    <label for="email">Email Address</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      placeholder="Phone"
                      v-model="formData.phone"
                      :readonly="!editMode"
                      :class="{ 'bg-light': !editMode, 'border-0': !editMode }"
                    />
                    <label for="phone">Phone Number</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      type="date"
                      class="form-control"
                      id="dob"
                      placeholder="Date of Birth"
                      v-model="formData.dob"
                      :readonly="!editMode"
                      :class="{ 'bg-light': !editMode, 'border-0': !editMode }"
                    />
                    <label for="dob">Date of Birth</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      id="address"
                      placeholder="Address"
                      style="height: 100px"
                      v-model="formData.address"
                      :readonly="!editMode"
                      :class="{ 'bg-light': !editMode, 'border-0': !editMode }"
                    ></textarea>
                    <label for="address">Address</label>
                  </div>
                </div>
              </div>

              <div v-if="editMode" class="d-flex justify-content-end gap-3 mt-4 animate__animated animate__fadeIn">
                <button type="button" class="btn btn-light rounded-pill px-4" @click="cancelEdit">
                  Discard Changes
                </button>
                <button type="submit" class="btn btn-primary rounded-pill px-4">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="row g-4 mb-4">
          <div class="col-sm-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 stat-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3">
                    <i class="bi bi-bag fs-4"></i>
                  </div>
                  <h6 class="text-muted mb-0">Orders</h6>
                </div>
                <h3 class="fw-bold mb-0">{{ user.ordersCount }}</h3>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 stat-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-success bg-opacity-10 text-success rounded-circle p-2 me-3">
                    <i class="bi bi-currency-dollar fs-4"></i>
                  </div>
                  <h6 class="text-muted mb-0">Total Spent</h6>
                </div>
                <h3 class="fw-bold mb-0">{{ formatCurrency(user.totalSpent) }}</h3>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 stat-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3">
                    <i class="bi bi-star fs-4"></i>
                  </div>
                  <h6 class="text-muted mb-0">Reviews</h6>
                </div>
                <h3 class="fw-bold mb-0">{{ user.reviewsCount }}</h3>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 stat-card">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="icon-box bg-danger bg-opacity-10 text-danger rounded-circle p-2 me-3">
                    <i class="bi bi-heart fs-4"></i>
                  </div>
                  <h6 class="text-muted mb-0">Wishlist</h6>
                </div>
                <h3 class="fw-bold mb-0">{{ user.wishlistCount }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-transparent border-0 p-4 pb-0">
            <h5 class="fw-bold mb-0">Recent Activity</h5>
          </div>
          <div class="card-body p-4">
            <div class="timeline">
              <div v-for="activity in recentActivities" :key="activity.id" class="timeline-item pb-4">
                <div class="timeline-marker bg-white border border-2 border-primary"></div>
                <div class="timeline-content ps-4">
                  <div class="d-flex justify-content-between align-items-start mb-1">
                    <h6 class="fw-bold mb-0">{{ activity.title }}</h6>
                    <small class="text-muted">{{ formatDate(activity.date) }}</small>
                  </div>
                  <p class="text-muted mb-0 small">{{ activity.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Avatar Upload Modal -->
    <div v-if="showAvatarUpload" class="modal-backdrop fade show"></div>
    <div v-if="showAvatarUpload" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Update Profile Picture</h5>
            <button type="button" class="btn-close" @click="showAvatarUpload = false"></button>
          </div>
          <div class="modal-body text-center py-4">
            <div class="position-relative d-inline-block mb-4">
              <img
                :src="avatarPreview || user.avatar"
                alt="Preview"
                class="rounded-circle shadow"
                style="width: 150px; height: 150px; object-fit: cover;"
              />
              <label class="btn btn-light btn-sm rounded-circle position-absolute bottom-0 end-0 shadow-sm border" style="cursor: pointer;">
                <i class="bi bi-camera"></i>
                <input
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="handleAvatarUpload"
                />
              </label>
            </div>
            <p class="text-muted small mb-0">Allowed *.jpeg, *.jpg, *.png, *.gif <br> Max size of 2 MB</p>
          </div>
          <div class="modal-footer border-0 justify-content-center pb-4">
            <button type="button" class="btn btn-light rounded-pill px-4" @click="showAvatarUpload = false">
              Cancel
            </button>
            <button type="button" class="btn btn-primary rounded-pill px-4" @click="saveAvatar">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProfileSidebar from '../components/ProfileSidebar.vue'

const router = useRouter()

// User Data
const user = reactive({
  id: null,
  name: '',
  email: '',
  phone: '',
  dob: '',
  address: '',
  avatar: '',
  ordersCount: 0,
  totalSpent: 0,
  reviewsCount: 0,
  wishlistCount: 0
})

// Form Data
const formData = reactive({ ...user })
const editMode = ref(false)
const showAvatarUpload = ref(false)
const avatarPreview = ref('')

// Recent Activities
const recentActivities = ref([])

onMounted(() => {
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
  // Ideally use a toast notification here
  alert('Profile updated successfully!')
}

const cancelEdit = () => {
  Object.assign(formData, user)
  editMode.value = false
}

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('File size too large. Max 2MB.')
      return
    }
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
    alert('Profile picture updated!')
  }
}

const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('user')
    router.push('/auth')
  }
}
</script>

<style scoped>
.stat-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
}

.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #f0f0f0;
}

.timeline-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  left: -2px;
}
</style>
