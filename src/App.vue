<template>
  <div class="min-vh-100 d-flex flex-column">
    <Navbar />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from './layouts/NavbarPage.vue'
import Footer from './layouts/FooterPage.vue'
</script>
