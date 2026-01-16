<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="auth-box">

      <h2 class="mb-4 text-center">Authentication</h2>

      <div class="mb-3 d-flex justify-content-center">
        <button class="btn btn-outline-primary me-2" @click="mode = 'login'">Login</button>
        <button class="btn btn-outline-success" @click="mode = 'register'">Register</button>
      </div>

      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border text-primary"></div>
        <p class="mt-2">Loading...</p>
      </div>

      <div v-if="mode === 'login' && !currentUser && !loading" class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center">Login</h5>

          <input v-model="loginEmail" type="email" class="form-control mb-2" placeholder="Email" />

          <div class="input-group mb-2">
            <input
              v-model="loginPassword"
              :type="showLoginPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Password"
            />
            <button class="btn btn-outline-secondary" @click="showLoginPassword = !showLoginPassword">
              <i :class="showLoginPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="d-flex justify-content-center">
            <button @click="handleLogin" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>

      <div v-if="mode === 'register' && !currentUser && !loading" class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center">Register</h5>

          <input v-model="registerName" type="text" class="form-control mb-2" placeholder="Name" />
          <input v-model="registerEmail" type="email" class="form-control mb-2" placeholder="Email" />

          <div class="input-group mb-2">
            <input
              v-model="registerPassword"
              :type="showRegisterPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Password"
            />
            <button class="btn btn-outline-secondary" @click="showRegisterPassword = !showRegisterPassword">
              <i :class="showRegisterPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="input-group mb-2">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Confirm Password"
            />
            <button class="btn btn-outline-secondary" @click="showConfirmPassword = !showConfirmPassword">
              <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="d-flex justify-content-center">
            <button @click="handleRegister" class="btn btn-success">Register</button>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div v-if="currentUser && !loading" class="card mb-4 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Logout</h5>
          <p class="mb-2"> {{ currentUser.email }}</p>
          <button @click="handleLogout" class="btn btn-danger">Logout</button>
        </div>
      </div>

      <div v-if="isAdmin && !loading" class="card shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Admin Access</h5>
          <button class="btn btn-dark" @click="goToAdmin">Go to Admin Panel</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { auth } from "../firebase"
import { register, login, logout } from "../services/authService"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "vue-router"
import { checkAdminRole, isAdminEmail } from "../utils/admin"

const router = useRouter()

const mode = ref("login")
const loading = ref(true)
const currentUser = ref(null)
const isAdmin = ref(false)

const registerName = ref("")
const registerEmail = ref("")
const registerPassword = ref("")
const confirmPassword = ref("")
const loginEmail = ref("")
const loginPassword = ref("")

const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  if (registerPassword.value !== confirmPassword.value) {
    alert("Passwords do not match")
    return
  }

  try {
    await register(registerName.value, registerEmail.value, registerPassword.value)
    router.push("/")
  } catch (err) {
    alert(err.message)
  }
}

const handleLogin = async () => {
  try {
    const user = await login(loginEmail.value, loginPassword.value)
    const admin = await checkAdminRole(user)
    
    if (admin) {
      router.push("/admin")
    } else {
      router.push("/")
    }
  } catch (err) {
    alert(err.message)
  }
}

const goToAdmin = () => {
  if (isAdmin.value) {
    router.push("/admin")
  }
}

const handleLogout = async () => {
  try {
    await logout()
    router.push("/auth")
  } catch (err) {
    alert(err.message)
  }
}

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user
    isAdmin.value = user ? await checkAdminRole(user) : false
    loading.value = false
  })
})
</script>

<style scoped>
.auth-box {
  width: 100%;
  max-width: 480px;
}

.card {
  border-radius: 12px;
  overflow: hidden;
}

.btn {
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
}

.input-group .btn {
  border-radius: 0 0.375rem 0.375rem 0;
}

.form-control {
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  border-color: #86b7fe;
}

@media (max-width: 576px) {
  .auth-box {
    padding: 1rem;
  }

  .d-flex.justify-content-center {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }
}
</style>
