<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-light text-center py-5">
      <div class="container">
        <h1 class="display-4 fw-bold">Welcome to Our Store</h1>
        <p class="lead text-muted mb-4">
          Discover amazing products, hot deals, and top categories.
        </p>
        <RouterLink to="/products" class="btn btn-primary btn-lg me-2">
          Shop Now
        </RouterLink>
        <RouterLink to="/deals" class="btn btn-outline-secondary btn-lg">
          View Deals
        </RouterLink>
      </div>
    </section>

    <!-- Quick Links Section -->
    <section class="container py-5">
      <div class="row text-center">
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Products</h5>
              <p class="card-text text-muted">
                Browse our wide range of products.
              </p>
              <RouterLink to="/products" class="btn btn-primary btn-sm">
                Explore
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Categories</h5>
              <p class="card-text text-muted">
                Find products by category.
              </p>
              <RouterLink to="/categories" class="btn btn-primary btn-sm">
                Browse
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Hot Deals</h5>
              <p class="card-text text-muted">
                Save big with our latest offers.
              </p>
              <RouterLink to="/deals" class="btn btn-primary btn-sm">
                Check Deals
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>
