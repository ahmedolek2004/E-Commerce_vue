<template>
  <div class="container py-5 text-center">
    <h1 class="display-4 text-danger">404</h1>
    <p class="lead">Page not found</p>

    <RouterLink to="/" class="btn btn-primary mt-3">
      Back to Home
    </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>
