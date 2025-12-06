<template>
  <div class="container py-5">
    <h1 class="h3">Category Details</h1>
    <p>Category ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup>
  // eslint-disable no-unused-vars
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
