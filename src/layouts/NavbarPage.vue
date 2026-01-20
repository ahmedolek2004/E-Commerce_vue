<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top main-nav">
    <div class="container px-3 px-lg-4">

      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <div class="logo-box me-2">
          <i class="bi bi-shop-window"></i>
        </div>
        <span class="brand-name">Shop<span class="text-warning">Hub</span></span>
      </RouterLink>

      <div class="d-flex d-lg-none align-items-center gap-3 ms-auto">
        <button class="icon-btn-mobile" @click="toggleMobileSearch">
          <i class="bi bi-search"></i>
        </button>
        <RouterLink class="icon-btn-mobile position-relative" to="/cart">
          <i class="bi bi-cart3"></i>
          <span v-if="cartStore.cartCount > 0" class="badge-count">{{ cartStore.cartCount }}</span>
        </RouterLink>
        <button class="burger-menu" @click="toggleMobileMenu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="mainDesktopNav">
        <ul class="navbar-nav mx-auto align-items-center">
          <li v-for="link in navLinks" :key="link.path" class="nav-item">
            <RouterLink class="nav-link-custom" :to="link.path" active-class="active">
              <i :class="['bi', link.icon]"></i>
              <span>{{ link.name }}</span>
              <span v-if="link.hot" class="hot-badge">HOT</span>
            </RouterLink>
          </li>
        </ul>

        <div class="search-box-desktop d-none d-lg-flex me-4">
          <i class="bi bi-search"></i>
          <input v-model="searchQuery" type="text" placeholder="Find products..." @keyup.enter="goSearch">
        </div>

        <div class="dropdown d-none d-lg-block">
          <div class="user-trigger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-avatar-mini">
              <i :class="currentUser ? 'bi-person-fill' : 'bi-person-lock'"></i>
            </div>
            <div class="user-info-text">
              <span class="welcome-msg">{{ currentUser ? 'Welcome' : 'Hello,' }}</span>
              <span class="user-name-bold text-truncate">{{ currentUser ? currentUser.email.split('@')[0] : 'Sign In' }}</span>
            </div>
          </div>

          <ul class="dropdown-menu dropdown-menu-end user-dropdown-card animate-pop">
            <template v-if="currentUser">
              <li class="user-card-header bg-light">
                <i class="bi bi-person-circle fs-2 text-primary"></i>
                <div class="ms-2 overflow-hidden">
                  <h6 class="mb-0 text-truncate">{{ currentUser.email }}</h6>
                  <span class="badge bg-success-soft text-success px-2 py-1">Member</span>
                </div>
              </li>
              <li><RouterLink class="dropdown-item py-2" to="/profile"><i class="bi bi-person-badge me-2"></i>My Profile</RouterLink></li>
              <li><RouterLink class="dropdown-item py-2" to="/orders"><i class="bi bi-box-seam me-2"></i>Order History</RouterLink></li>
              <li><RouterLink class="dropdown-item py-2" to="/wishlist"><i class="bi bi-heart me-2"></i>Wishlist</RouterLink></li>
              <li v-if="isAdmin">
                <hr class="dropdown-divider">
                <RouterLink class="dropdown-item text-warning fw-bold py-2" to="/admin"><i class="bi bi-shield-lock me-2"></i>Admin Dashboard</RouterLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item text-danger py-2" @click="handleLogout"><i class="bi bi-power me-2"></i>Logout</button></li>
            </template>
            <template v-else>
              <li class="p-4 text-center">
                <div class="mb-3"><i class="bi bi-person-circle fs-1 text-muted"></i></div>
                <p class="small text-muted mb-3">Login to track orders and manage your cart.</p>
                <div class="d-grid gap-2">
                  <RouterLink class="btn btn-primary btn-sm rounded-pill" to="/auth">Sign In</RouterLink>
                  <RouterLink class="btn btn-outline-primary btn-sm rounded-pill" to="/auth?mode=register">Create Account</RouterLink>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>

    <div class="sidebar-mask" :class="{ 'active': mobileMenuOpen }" @click="closeMobileMenu"></div>
    <aside class="side-menu" :class="{ 'open': mobileMenuOpen }">
      <div class="side-menu-head bg-primary">
        <h5 class="m-0">Menu Navigator</h5>
        <button class="btn-close btn-close-white" @click="closeMobileMenu"></button>
      </div>
      <div class="side-menu-body">
        <div class="list-group list-group-flush">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="list-item" @click="closeMobileMenu">
            <i :class="['bi', link.icon]"></i> {{ link.name }}
            <span v-if="link.hot" class="ms-auto badge bg-danger rounded-pill">Hot</span>
          </RouterLink>

          <div class="divider">User Center</div>

          <template v-if="currentUser">
            <RouterLink to="/profile" class="list-item" @click="closeMobileMenu"><i class="bi bi-person"></i> Profile</RouterLink>
            <RouterLink to="/orders" class="list-item" @click="closeMobileMenu"><i class="bi bi-bag-check"></i> Orders</RouterLink>
            <button class="list-item text-danger border-0 bg-transparent w-100 text-start" @click="handleLogout"><i class="bi bi-box-arrow-right"></i> Logout</button>
          </template>
          <template v-else>
            <div class="px-4 py-3">
              <RouterLink to="/auth" class="btn btn-primary w-100 rounded-pill mb-2" @click="closeMobileMenu">Sign In</RouterLink>
              <RouterLink to="/auth?mode=register" class="btn btn-outline-primary w-100 rounded-pill" @click="closeMobileMenu">Register</RouterLink>
            </div>
          </template>
        </div>
      </div>
    </aside>

    <Transition name="slide-top">
      <div v-if="mobileSearchOpen" class="mobile-search-full bg-primary">
        <div class="container h-100 d-flex align-items-center gap-2">
          <input v-model="searchQuery" ref="mobileSearchInput" type="text" class="form-control" placeholder="What are you looking for?" @keyup.enter="goSearch">
          <button class="btn btn-warning" @click="goSearch"><i class="bi bi-search"></i></button>
          <button class="btn btn-link text-white text-decoration-none" @click="toggleMobileSearch">Cancel</button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { checkAdminRole } from "../utils/admin";

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

const searchQuery = ref("");
const mobileMenuOpen = ref(false);
const mobileSearchOpen = ref(false);
const mobileSearchInput = ref(null);
const currentUser = ref(null);
const isAdmin = ref(false);

const navLinks = [
  { name: 'Home', path: '/', icon: 'bi-house' },
  { name: 'Shop', path: '/products', icon: 'bi-grid' },
  { name: 'Deals', path: '/deals', icon: 'bi-percent', hot: true },
  { name: 'About', path: '/about', icon: 'bi-info-circle' },
  { name: 'Contact', path: '/contact', icon: 'bi-envelope' }
];

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const toggleMobileSearch = () => {
  mobileSearchOpen.value = !mobileSearchOpen.value;
  if (mobileSearchOpen.value) setTimeout(() => mobileSearchInput.value?.focus(), 150);
};

const goSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { query: searchQuery.value } });
    mobileSearchOpen.value = false;
    closeMobileMenu();
  }
};

const handleLogout = async () => {
  try {
    await signOut(auth);
    currentUser.value = null;
    isAdmin.value = false;
    router.push("/auth");
    closeMobileMenu();
  } catch (error) { console.error(error); }
};

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    isAdmin.value = user ? await checkAdminRole(user) : false;
  });
});

watch(() => route.path, () => closeMobileMenu());
</script>

<style scoped>
/* --- 1. Global Navbar Styles --- */
.main-nav {
  background: linear-gradient(90deg, #0d6efd 0%, #1e40af 100%);
  padding: 0.6rem 0;
  z-index: 1050;
}

.logo-box {
  background: white; color: #0d6efd;
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px; font-size: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.brand-name {
  font-size: 1.6rem; font-weight: 800;
  letter-spacing: -0.5px; color: white;
}

/* --- 2. Desktop Navigation --- */
.nav-link-custom {
  color: rgba(255,255,255,0.85); text-decoration: none;
  padding: 0.5rem 1rem; margin: 0 0.2rem;
  display: flex; flex-direction: column; align-items: center;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.nav-link-custom i { font-size: 1.2rem; margin-bottom: 2px; }
.nav-link-custom span { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; }

.nav-link-custom:hover, .nav-link-custom.active { color: white; }
.nav-link-custom.active::after {
  content: ''; position: absolute; bottom: -5px;
  width: 25px; height: 3px; background: #ffc107; border-radius: 10px;
}

/* --- 3. Desktop Search & User Profile --- */
.search-box-desktop {
  background: rgba(255,255,255,0.12);
  border-radius: 50px; padding: 0.4rem 1.2rem;
  align-items: center; border: 1px solid rgba(255,255,255,0.2);
  transition: 0.3s;
}

.search-box-desktop:focus-within { background: white; width: 280px; }
.search-box-desktop input {
  background: transparent; border: none; color: white;
  outline: none; font-size: 0.85rem; margin-left: 8px;
}
.search-box-desktop:focus-within input { color: #333; }
.search-box-desktop i { color: rgba(255,255,255,0.7); }
.search-box-desktop:focus-within i { color: #0d6efd; }

.user-trigger {
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; padding: 4px 12px;
  background: rgba(255,255,255,0.1); border-radius: 50px;
  border: 1px solid rgba(255,255,255,0.1); transition: 0.3s;
}

.user-trigger:hover { background: rgba(255,255,255,0.2); }

.user-avatar-mini {
  width: 32px; height: 32px; background: white;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  color: #0d6efd; font-size: 1.1rem;
}

.user-info-text { display: flex; flex-direction: column; line-height: 1.2; }
.welcome-msg { font-size: 0.65rem; color: rgba(255,255,255,0.7); }
.user-name-bold { font-size: 0.85rem; font-weight: 700; color: white; max-width: 100px; }

/* --- 4. User Dropdown Card --- */
.user-dropdown-card {
  width: 280px; border-radius: 16px; padding: 0.5rem;
  margin-top: 15px; border: none;
}

.user-card-header {
  padding: 1rem; display: flex; align-items: center;
  border-radius: 12px; margin-bottom: 0.5rem;
}

.bg-success-soft { background: #d1fae5; }

/* --- 5. Mobile Sidebar --- */
.side-menu {
  position: fixed; top: 0; right: -320px;
  width: 320px; height: 100vh; background: white;
  z-index: 2000; transition: 0.4s;
  display: flex; flex-direction: column;
}
.side-menu.open { right: 0; }

.sidebar-mask {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
  z-index: 1999; opacity: 0; visibility: hidden; transition: 0.3s;
}
.sidebar-mask.active { opacity: 1; visibility: visible; }

.side-menu-head { padding: 2rem 1.5rem; color: white; display: flex; justify-content: space-between; align-items: center; }

.list-item {
  padding: 1rem 1.5rem; color: #444; text-decoration: none;
  display: flex; align-items: center; gap: 15px; font-weight: 500;
  border-radius: 8px; margin: 0.2rem 0.8rem; transition: 0.2s;
}
.list-item:hover { background: #f0f7ff; color: #0d6efd; }
.list-item i { font-size: 1.2rem; color: #0d6efd; }

.divider {
  padding: 1.5rem 1.5rem 0.5rem; font-size: 0.7rem;
  font-weight: 800; text-transform: uppercase; color: #999;
}

/* --- 6. Helpers & Badges --- */
.badge-count {
  position: absolute; top: -5px; right: -5px;
  background: #ffc107; color: #000; font-size: 0.65rem;
  font-weight: 800; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 2px solid #0d6efd;
}

.hot-badge {
  position: absolute; top: -5px; right: -8px;
  background: #dc3545; color: white; font-size: 0.55rem;
  padding: 1px 4px; border-radius: 4px; font-weight: 800;
}

.burger-menu {
  display: flex; flex-direction: column; gap: 4px;
  background: none; border: none; padding: 0;
}
.burger-menu span { width: 22px; height: 2px; background: white; border-radius: 2px; }

.animate-pop { animation: pop 0.3s ease-out; }
@keyframes pop { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.mobile-search-full {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1060;
}
</style>
