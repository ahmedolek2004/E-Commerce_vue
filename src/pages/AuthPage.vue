<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="w-50">
      <h2 class="mb-4 text-center">Authentication</h2>

      <!-- زر التبديل بين Login و Register -->
      <div class="mb-3 d-flex justify-content-center">
        <button class="btn btn-outline-primary me-2" @click="mode = 'login'">Login</button>
        <button class="btn btn-outline-success" @click="mode = 'register'">Register</button>
      </div>

      <!-- Login Form -->
      <div v-if="mode === 'login' && !currentUser" class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center">Login</h5>
          <input v-model="loginEmail" type="email" class="form-control mb-2" placeholder="Email" />

          <!-- Password with eye toggle -->
          <div class="input-group mb-2">
            <input
              v-model="loginPassword"
              :type="showLoginPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Password"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="showLoginPassword = !showLoginPassword"
            >
              <i :class="showLoginPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="d-flex justify-content-center">
            <button @click="handleLogin" class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>

      <!-- Register Form -->
      <div v-if="mode === 'register' && !currentUser" class="card mb-4 shadow-sm">
        <div class="card-body">
          <h5 class="card-title text-center">Register</h5>
          <input v-model="registerName" type="text" class="form-control mb-2" placeholder="Name" />
          <input v-model="registerEmail" type="email" class="form-control mb-2" placeholder="Email" />

          <!-- Register Password -->
          <div class="input-group mb-2">
            <input
              v-model="registerPassword"
              :type="showRegisterPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Password"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="showRegisterPassword = !showRegisterPassword"
            >
              <i :class="showRegisterPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <!-- Confirm Password -->
          <div class="input-group mb-2">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              class="form-control"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <div class="d-flex justify-content-center">
            <button @click="handleRegister" class="btn btn-success">Register</button>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div v-if="currentUser" class="card mb-4 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Logout</h5>
          <button @click="handleLogout" class="btn btn-danger">Logout</button>
        </div>
      </div>

      <!-- Current User (Admin only) -->
      <div v-if="isAdmin" class="card shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Current User</h5>
          <p>👤 {{ currentUser.email }}</p>
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

const router = useRouter()
const mode = ref("login")

const registerName = ref("")
const registerEmail = ref("")
const registerPassword = ref("")
const confirmPassword = ref("")
const loginEmail = ref("")
const loginPassword = ref("")
const currentUser = ref(null)
const isAdmin = ref(false)

// متغيرات العين
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// تسجيل جديد
const handleRegister = async () => {
  if (registerPassword.value !== confirmPassword.value) {
    alert("❌ Passwords do not match")
    return
  }
  try {
    await register(registerName.value, registerEmail.value, registerPassword.value)
    alert(`✅ Registered successfully! Welcome ${registerName.value}`)
    router.push("/") // تحويل للـ Home بعد التسجيل
  } catch (err) {
    alert("❌ " + err.message)
  }
}

// تسجيل دخول
const handleLogin = async () => {
  try {
    await login(loginEmail.value, loginPassword.value)
    alert("✅ Logged in successfully!")
    router.push("/") // تحويل للـ Home بعد الدخول
  } catch (err) {
    alert("❌ " + err.message)
  }
}

// تسجيل خروج
const handleLogout = async () => {
  try {
    await logout()
    alert("✅ Logged out successfully!")
    router.push("/auth") // يرجع لصفحة الـ Auth بعد الخروج
  } catch (err) {
    alert("❌ " + err.message)
  }
}

// متابعة المستخدم الحالي
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    if (user && user.email === "admin@site.com") {
      isAdmin.value = true
    } else {
      isAdmin.value = false
    }
  })
})
</script>
