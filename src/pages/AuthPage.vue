<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="auth-box">

      <h2 class="mb-4 text-center">Authentication</h2>

      <!--  Switch Buttons -->
      <div class="mb-3 d-flex justify-content-center">
        <button class="btn btn-outline-primary me-2" @click="mode = 'login'">Login</button>
        <button class="btn btn-outline-success" @click="mode = 'register'">Register</button>
      </div>

      <!--  Loading -->
      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border text-primary"></div>
        <p class="mt-2">Loading...</p>
      </div>

      <!--  Login Form -->
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

      <!--  Register Form -->
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

      <!--  Admin Info -->
      <div v-if="isAdmin && !loading" class="card shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Admin Access</h5>
          <button class="btn btn-dark" @click="router.push('/admin')">Go to Admin Panel</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from "vue"
import { auth, db } from "../firebase"
import { register, login, logout } from "../services/authService"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()

//  UI State
const mode = ref("login")
const loading = ref(true)

//  Form fields
const registerName = ref("")
const registerEmail = ref("")
const registerPassword = ref("")
const confirmPassword = ref("")
const loginEmail = ref("")
const loginPassword = ref("")

//  User state
const currentUser = ref(null)
const userRole = ref("user")

//  Derived state
const isAdmin = ref(false)

//  Password visibility
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

//  Load user role
const loadUserRole = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid))
  if (snap.exists()) {
    userRole.value = snap.data().role
    isAdmin.value = snap.data().role === "admin"
  } else {
    userRole.value = "user"
    isAdmin.value = false
  }
}

//  Register
const handleRegister = async () => {
  if (registerPassword.value !== confirmPassword.value) {
    alert("❌ Passwords do not match")
    return
  }

  try {
    await register(registerName.value, registerEmail.value, registerPassword.value)
    alert(` Registered successfully! Welcome ${registerName.value}`)
    router.push("/")
  } catch (err) {
    alert("❌ " + err.message)
  }
}

//  Login
const handleLogin = async () => {
  try {
    const user = await login(loginEmail.value, loginPassword.value)
    alert("✅ Logged in successfully!")

    await loadUserRole(user.uid)

    if (isAdmin.value) {
      router.push("/admin")
    } else {
      router.push("/")
    }

  } catch (err) {
    alert("❌ " + err.message)
  }
}

//  Logout
const handleLogout = async () => {
  try {
    await logout()
    alert(" Logged out successfully!")
    router.push("/auth")
  } catch (err) {
    alert("❌ " + err.message)
  }
}

//  Track user
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user

    if (user) {
      await loadUserRole(user.uid)
    } else {
      isAdmin.value = false
      userRole.value = "user"
    }

    loading.value = false
  })
})
</script>

<style scoped>
.auth-box {
  width: 100%;
  max-width: 480px;
}
</style>
