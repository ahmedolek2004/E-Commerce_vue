<template>
  <div class="container py-5">
    <h1 class="mb-4">About Us</h1>

    <!-- Section 1 -->
    <div class="mb-4">
      <p class="lead text-muted">
        Welcome to our store! We are passionate about delivering high-quality products
        and providing the best shopping experience for our customers.
      </p>
    </div>

    <!-- Section 2 -->
    <div class="row mb-4">
      <div class="col-md-6">
        <h3>Our Mission</h3>
        <p>
          Our mission is to make shopping easy, affordable, and enjoyable.
          We carefully select our products to ensure they meet the highest standards.
        </p>
      </div>
      <div class="col-md-6">
        <h3>Our Vision</h3>
        <p>
          We aim to become a trusted destination for customers worldwide,
          offering innovative solutions and excellent customer service.
        </p>
      </div>
    </div>

    <!-- Section 3 -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Quality</h5>
            <p class="card-text">We ensure every product is tested and verified before reaching you.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Trust</h5>
            <p class="card-text">We value transparency and honesty in all our dealings.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Support</h5>
            <p class="card-text">Our team is always ready to help you with any questions or issues.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 4 -->
    <div class="text-center mt-5">
      <h4>Contact Us</h4>
      <p class="text-muted">Have questions? <RouterLink to="/contact">Get in touch</RouterLink> with us today.</p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>
