<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center">Authentication</h1>

    <ul class="nav nav-tabs mb-4" id="authTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="login-tab"
          data-bs-toggle="tab"
          data-bs-target="#login"
          type="button"
          role="tab"
        >
          Login
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="signup-tab"
          data-bs-toggle="tab"
          data-bs-target="#signup"
          type="button"
          role="tab"
        >
          Signup
        </button>
      </li>
    </ul>

    <div class="tab-content">
      <!-- Login Form -->
      <div class="tab-pane fade show active" id="login" role="tabpanel">
        <form @submit.prevent="handleLogin" class="card p-4 shadow-sm">
          <div class="mb-3">
            <label for="loginEmail" class="form-label">Email</label>
            <input v-model="loginEmail" type="email" class="form-control" id="loginEmail" required />
          </div>
          <div class="mb-3">
            <label for="loginPassword" class="form-label">Password</label>
            <input v-model="loginPassword" type="password" class="form-control" id="loginPassword" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>

      <!-- Signup Form -->
      <div class="tab-pane fade" id="signup" role="tabpanel">
        <form @submit.prevent="handleSignup" class="card p-4 shadow-sm">
          <div class="mb-3">
            <label for="signupName" class="form-label">Name</label>
            <input v-model="signupName" type="text" class="form-control" id="signupName" required />
          </div>
          <div class="mb-3">
            <label for="signupEmail" class="form-label">Email</label>
            <input v-model="signupEmail" type="email" class="form-control" id="signupEmail" required />
          </div>
          <div class="mb-3">
            <label for="signupPassword" class="form-label">Password</label>
            <input v-model="signupPassword" type="password" class="form-control" id="signupPassword" required />
          </div>
          <div class="mb-3">
            <label for="ConfirmsignupPassword" class="form-label">ConfirmPassword</label>
            <input v-model="ConfirmsignupPassword" type="password" class="form-control" id="ConfirmsignupPassword" required />
          </div>
          <button type="submit" class="btn btn-success w-100">Signup</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

// Login form state
const loginEmail = ref("")
const loginPassword = ref("")

// Signup form state
const signupName = ref("")
const signupEmail = ref("")
const signupPassword = ref("")

// Handlers
const handleLogin = () => {
  console.log("Login with:", loginEmail.value, loginPassword.value)
  // هنا تقدر تربط بـ Firebase Auth أو API
}

const handleSignup = () => {
  console.log("Signup with:", signupName.value, signupEmail.value, signupPassword.value)
  // هنا تقدر تربط بـ Firebase Auth أو API
}
</script>
