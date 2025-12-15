<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">

      <!-- Logo -->
      <RouterLink class="navbar-brand fw-bold" to="/">
        <i class="bi bi-shop fs-3 me-2"></i>
      </RouterLink>

      <!-- Toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Content -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/">
              <i class="bi bi-house-door fs-5"></i><br />
              <small>Home</small>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/products">
              <i class="bi bi-box-seam fs-5"></i><br />
              <small>Products</small>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/categories">
              <i class="bi bi-grid fs-5"></i><br />
              <small>Categories</small>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/deals">
              <i class="bi bi-tags fs-5"></i><br />
              <small>Deals</small>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/about">
              <i class="bi bi-info-circle fs-5"></i><br />
              <small>About</small>
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/contact">
              <i class="bi bi-envelope fs-5"></i><br />
              <small>Contact</small>
            </RouterLink>
          </li>


        </ul>

        <!--  Right Icons -->
        <ul class="navbar-nav">

          <!-- Cart -->
          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center position-relative" to="/cart">
              <i class="bi bi-cart3 fs-5"></i><br />
              <small>Cart</small>
              <span
                v-if="cartStore.cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cartStore.cartCount }}
              </span>
            </RouterLink>
          </li>

          <!-- Account -->
          <li class="nav-item">
            <RouterLink class="nav-link text-white text-center" to="/auth">
              <i class="bi bi-person-circle fs-5"></i><br />
              <small>Account</small>
            </RouterLink>
          </li>

        </ul>
      </div>
    </div>
  </nav>

  <!--  Search Bar Under Navbar -->
  <div class="bg-light py-2 shadow-sm search-bar-wrapper">
    <div class="container">
      <form class="d-flex" @submit.prevent="goSearch">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search products..."
        />
        <button class="btn btn-primary ms-2">
          <i class="bi bi-search"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router"
import { ref } from "vue"
import { useCartStore } from "../stores/cart"

const router = useRouter()
const searchQuery = ref("")

//  Pinia cart store
const cartStore = useCartStore()

const goSearch = () => {
  if (searchQuery.value.trim() !== "") {
    router.push(`/search?query=${searchQuery.value}`)
  }
}
</script>

<style scoped>
.navbar-nav .nav-link small {
  font-size: 0.75rem;
}

.search-bar-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
}

@media (max-width: 768px) {
  .search-bar-wrapper form input {
    font-size: 14px;
  }
}
</style>
