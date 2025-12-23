<template>
  <!-- Main Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg sticky-top">
    <div class="container px-3 px-lg-4">

      <!-- Logo and Brand -->
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-shop-window fs-2 me-2"></i>
        <span class="fw-bold fs-4 d-none d-md-inline">Shop<span class="text-warning">Hub</span></span>
      </RouterLink>

      <!-- Mobile Search Toggle -->
      <button
        class="btn btn-outline-light d-lg-none me-2"
        @click="toggleMobileSearch"
        type="button"
      >
        <i class="bi bi-search"></i>
      </button>

      <!-- Mobile Cart Toggle -->
      <RouterLink
        class="btn btn-outline-light d-lg-none me-2 position-relative"
        to="/cart"
      >
        <i class="bi bi-cart3"></i>
        <span
          v-if="cartStore.cartCount > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 0.6rem; padding: 0.25em 0.5em;"
        >
          {{ cartStore.cartCount }}
        </span>
      </RouterLink>

      <!-- Mobile Menu Toggle -->
      <button
        class="navbar-toggler border-0"
        type="button"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Desktop Navigation -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2"
              to="/"
              active-class="active"
              @click="closeMobileMenu"
            >
              <i class="bi bi-house-door fs-5 mb-1"></i>
              <span class="nav-text">Home</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2"
              to="/products"
              active-class="active"
              @click="closeMobileMenu"
            >
              <i class="bi bi-box-seam fs-5 mb-1"></i>
              <span class="nav-text">Products</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2"
              to="/categories"
              active-class="active"
              @click="closeMobileMenu"
            >
              <i class="bi bi-grid-3x3-gap fs-5 mb-1"></i>
              <span class="nav-text">Categories</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2"
              to="/deals"
              active-class="active"
              @click="closeMobileMenu"
            >
              <i class="bi bi-tags fs-5 mb-1"></i>
              <span class="nav-text">Deals</span>
              <span class="badge bg-danger badge-sm">HOT</span>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2"
              to="/about"
              active-class="active"
              @click="closeMobileMenu"
            >
              <i class="bi bi-info-circle fs-5 mb-1"></i>
              <span class="nav-text">About</span>
            </RouterLink>
          </li>
        </ul>

        <!-- Desktop Search Bar -->
        <div class="d-none d-lg-flex align-items-center" style="max-width: 400px;">
          <div class="input-group search-group">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control border-end-0"
              placeholder="Search products..."
              @keyup.enter="goSearch"
            >
            <button class="btn btn-light border-start-0" @click="goSearch">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>

        <!-- Desktop Right Icons -->
        <ul class="navbar-nav d-none d-lg-flex">
          <li class="nav-item dropdown">
            <RouterLink
              class="nav-link d-flex flex-column align-items-center mx-2 position-relative"
              to="/cart"
            >
              <i class="bi bi-cart3 fs-5 mb-1"></i>
              <span class="nav-text">Cart</span>
              <span
                v-if="cartStore.cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 0.65rem; padding: 0.25em 0.5em;"
              >
                {{ cartStore.cartCount }}
              </span>
            </RouterLink>
          </li>

          <!-- Account Dropdown - Dynamic based on auth state -->
          <li class="nav-item dropdown">
            <a
              class="nav-link d-flex flex-column align-items-center mx-2 dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle fs-5 mb-1"></i>
              <span class="nav-text">
                {{ currentUser ? 'Account' : 'Login' }}
              </span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow border-0">
              <!-- If user is logged in -->
              <template v-if="currentUser">
                <li>
                  <div class="dropdown-item-text px-3 py-2">
                    <small class="text-muted">Signed in as</small>
                    <div class="fw-semibold">{{ currentUser.email }}</div>
                  </div>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <RouterLink class="dropdown-item" to="/profile" @click="closeMobileMenu">
                    <i class="bi bi-person me-2"></i>My Profile
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/orders" @click="closeMobileMenu">
                    <i class="bi bi-bag me-2"></i>My Orders
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/wishlist" @click="closeMobileMenu">
                    <i class="bi bi-heart me-2"></i>Wishlist
                  </RouterLink>
                </li>
                <li v-if="isAdmin">
                  <hr class="dropdown-divider">
                  <RouterLink class="dropdown-item text-warning" to="/admin" @click="closeMobileMenu">
                    <i class="bi bi-shield-check me-2"></i>Admin Panel
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item text-danger" @click="handleLogout">
                    <i class="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </template>

              <!-- If user is not logged in -->
              <template v-else>
                <li>
                  <RouterLink class="dropdown-item" to="/auth" @click="closeMobileMenu">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/auth?mode=register" @click="closeMobileMenu">
                    <i class="bi bi-person-plus me-2"></i>Register
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <RouterLink class="dropdown-item" to="/about" @click="closeMobileMenu">
                    <i class="bi bi-info-circle me-2"></i>About Us
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/contact" @click="closeMobileMenu">
                    <i class="bi bi-envelope me-2"></i>Contact Us
                  </RouterLink>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div
      v-if="mobileSearchOpen"
      class="bg-light py-3 d-lg-none border-top"
      style="animation: slideDown 0.3s ease-out;"
    >
      <div class="container">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search products..."
            ref="mobileSearchInput"
            @keyup.enter="goSearch"
          >
          <button class="btn btn-primary" @click="goSearch">
            <i class="bi bi-search"></i>
          </button>
          <button class="btn btn-outline-secondary" @click="toggleMobileSearch">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (Offcanvas) -->
    <div
      class="mobile-menu-overlay"
      :class="{ 'show': mobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>

    <div
      class="mobile-menu"
      :class="{ 'show': mobileMenuOpen }"
    >
      <!-- Mobile Menu Header -->
      <div class="mobile-menu-header bg-primary text-white p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0">
            <i class="bi bi-list me-2"></i>Menu
          </h5>
          <button class="btn btn-outline-light btn-sm" @click="closeMobileMenu">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- User Info in Mobile Menu -->
        <div class="mt-3 d-flex align-items-center">
          <i class="bi" :class="currentUser ? 'bi-person-check' : 'bi-person-circle'"></i>
          <div class="ms-3">
            <h6 class="mb-0">
              {{ currentUser ? currentUser.email : 'Welcome Guest' }}
            </h6>
            <small>
              {{ currentUser ? 'Signed in' : 'Sign in to your account' }}
            </small>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Items -->
      <div class="mobile-menu-body">
        <div class="list-group list-group-flush">
          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/"
            @click="closeMobileMenu"
          >
            <i class="bi bi-house-door me-3"></i>Home
          </RouterLink>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/products"
            @click="closeMobileMenu"
          >
            <i class="bi bi-box-seam me-3"></i>Products
            <span class="badge bg-primary float-end">{{ cartStore.cartCount }}</span>
          </RouterLink>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/categories"
            @click="closeMobileMenu"
          >
            <i class="bi bi-grid-3x3-gap me-3"></i>Categories
          </RouterLink>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/deals"
            @click="closeMobileMenu"
          >
            <i class="bi bi-tags me-3"></i>Hot Deals
            <span class="badge bg-danger float-end">HOT</span>
          </RouterLink>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/cart"
            @click="closeMobileMenu"
          >
            <i class="bi bi-cart3 me-3"></i>Shopping Cart
            <span class="badge bg-primary float-end">{{ cartStore.cartCount }}</span>
          </RouterLink>

          <!-- Dynamic User Links -->
          <template v-if="currentUser">
            <RouterLink
              class="list-group-item list-group-item-action border-0 py-3"
              to="/profile"
              @click="closeMobileMenu"
            >
              <i class="bi bi-person me-3"></i>My Profile
            </RouterLink>

            <RouterLink
              class="list-group-item list-group-item-action border-0 py-3"
              to="/orders"
              @click="closeMobileMenu"
            >
              <i class="bi bi-bag me-3"></i>My Orders
            </RouterLink>

            <RouterLink
              v-if="isAdmin"
              class="list-group-item list-group-item-action border-0 py-3 text-warning"
              to="/admin"
              @click="closeMobileMenu"
            >
              <i class="bi bi-shield-check me-3"></i>Admin Panel
            </RouterLink>

            <button
              class="list-group-item list-group-item-action border-0 py-3 text-danger"
              @click="handleLogout"
            >
              <i class="bi bi-box-arrow-right me-3"></i>Logout
            </button>
          </template>

          <template v-else>
            <RouterLink
              class="list-group-item list-group-item-action border-0 py-3"
              to="/auth"
              @click="closeMobileMenu"
            >
              <i class="bi bi-box-arrow-in-right me-3"></i>Sign In
            </RouterLink>
          </template>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/about"
            @click="closeMobileMenu"
          >
            <i class="bi bi-info-circle me-3"></i>About Us
          </RouterLink>

          <RouterLink
            class="list-group-item list-group-item-action border-0 py-3"
            to="/contact"
            @click="closeMobileMenu"
          >
            <i class="bi bi-envelope me-3"></i>Contact Us
          </RouterLink>
        </div>
      </div>

      <!-- Mobile Menu Footer -->
      <div class="mobile-menu-footer border-top p-3">
        <div class="text-center">
          <small class="text-muted">© 2024 ShopHub. All rights reserved.</small>
          <div v-if="currentUser" class="mt-2">
            <small class="text-success">
              <i class="bi bi-check-circle me-1"></i>Signed in
            </small>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { useCartStore } from "../stores/cart"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"

const router = useRouter()
const cartStore = useCartStore()
const searchQuery = ref("")
const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const mobileSearchInput = ref(null)

// Auth state
const currentUser = ref(null)
const isAdmin = ref(false)

// قائمة الإيميلات المسموحة كأدمن
const adminEmails = ['admin@example.com', 'ahmed@example.com', 'test@test.com']

const goSearch = () => {
  if (searchQuery.value.trim() !== "") {
    router.push(`/search?query=${searchQuery.value}`)
    closeMobileMenu()
    closeMobileSearch()
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = 'auto'
}

const toggleMobileSearch = async () => {
  mobileSearchOpen.value = !mobileSearchOpen.value
  if (mobileSearchOpen.value) {
    // استخدام setTimeout بدلاً من nextTick
    setTimeout(() => {
      mobileSearchInput.value?.focus()
    }, 100)
  }
}
const closeMobileSearch = () => {
  mobileSearchOpen.value = false
}

// Load user role
const loadUserRole = async (uid) => {
  try {
    if (!uid) return

    const snap = await getDoc(doc(db, "users", uid))
    if (snap.exists()) {
      const userData = snap.data()
      isAdmin.value = userData.role === "admin"
    }

    // بالإضافة للتحقق من قاعدة البيانات، تحقق من قائمة الإيميلات
    if (currentUser.value && adminEmails.includes(currentUser.value.email)) {
      isAdmin.value = true
    }
  } catch (error) {
    console.error("Error loading user role:", error)
    isAdmin.value = false
  }
}

// Logout function
const handleLogout = async () => {
  try {
    await signOut(auth)
    currentUser.value = null
    isAdmin.value = false
    closeMobileMenu()
    alert("✅ Logged out successfully!")
    router.push("/auth")
  } catch (error) {
    console.error("Logout error:", error)
    alert("❌ Logout failed: " + error.message)
  }
}

// Track auth state
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user

    if (user) {
      await loadUserRole(user.uid)
    } else {
      isAdmin.value = false
    }
  })
})

// Close menu when clicking outside on mobile
document.addEventListener('click', (event) => {
  const mobileMenu = document.querySelector('.mobile-menu')
  const navbarToggler = document.querySelector('.navbar-toggler')

  if (mobileMenuOpen.value &&
      mobileMenu &&
      !mobileMenu.contains(event.target) &&
      navbarToggler &&
      !navbarToggler.contains(event.target)) {
    closeMobileMenu()
  }
})
</script>

<style scoped>
.navbar {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.navbar-brand {
  color: white !important;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
  padding: 0.5rem 0.75rem !important;
  border-radius: 8px;
  transition: all 0.3s ease;
  min-width: 70px;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.15);
  color: white !important;
}

.nav-link:hover:not(.active) {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-text {
  font-size: 0.75rem;
  font-weight: 500;
}

.search-group {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.search-group input {
  border: none;
  padding: 0.75rem 1rem;
}

.search-group button {
  padding: 0.75rem 1.25rem;
}

/* Mobile Menu Styles */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.show {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  background: white;
  z-index: 1050;
  transform: translateX(100%);
  transition: transform 0.3s ease-out;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.mobile-menu.show {
  transform: translateX(0);
}

.mobile-menu-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-header .bi {
  font-size: 2rem;
}

.mobile-menu-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.mobile-menu-footer {
  background: #f8f9fa;
}

.list-group-item {
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}

.list-group-item:hover {
  background: #f8f9fa;
  border-left-color: #0d6efd;
  padding-left: 1.5rem;
}

.list-group-item i {
  width: 24px;
  text-align: center;
}

.badge-sm {
  font-size: 0.65rem;
  padding: 0.25em 0.5em;
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .navbar-nav .nav-link {
    margin: 0.25rem 0;
  }
}

@media (max-width: 576px) {
  .mobile-menu {
    width: 280px;
  }

  .navbar {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}

/* Custom scrollbar for mobile menu */
.mobile-menu-body::-webkit-scrollbar {
  width: 6px;
}

.mobile-menu-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.mobile-menu-body::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.mobile-menu-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
