<template>
  <footer class="bg-dark text-light mt-auto py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="fw-bold mb-3"><i class="bi bi-shop me-2"></i>Vue Store</h5>
          <p class="text-">
            Your one-stop destination for quality products at unbeatable prices. Shop with
            confidence and enjoy fast delivery.
          </p>
        </div>
        <div class="col-md-2 mb-4 mb-md-0">
          <h6 class="fw-bold mb-3">Quick Links</h6>
          <ul class="list-unstyled">
            <li><RouterLink to="/" class="text- text-decoration-none">Home</RouterLink></li>
            <li>
              <RouterLink to="/products" class="text- text-decoration-none">Products</RouterLink>
            </li>
            <li>
              <RouterLink to="/categories" class="text- text-decoration-none"
                >Categories</RouterLink
              >
            </li>
            <li><RouterLink to="/deals" class="text- text-decoration-none">Deals</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-2 mb-4 mb-md-0">
          <h6 class="fw-bold mb-3">Support</h6>
          <ul class="list-unstyled">
            <li>
              <RouterLink to="/about" class="text- text-decoration-none">About Us</RouterLink>
            </li>
            <li>
              <RouterLink to="/contact" class="text- text-decoration-none">Contact</RouterLink>
            </li>
            <li><a href="#" class="text- text-decoration-none">FAQ</a></li>
            <li><a href="#" class="text- text-decoration-none">Shipping</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold mb-3">Connect With Us</h6>
        <div class="social-icon">
            <div class="d-flex gap-3 mb-3">
            <a href="//www.facebook.com/ahmed.abdelhlem.9615" class="text-light fs-4"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="/x.com/AhmedAbdelhle10" class="text-light fs-4"
              ><i class="bi bi-twitter"></i
            ></a>
            <a
              href="/www.instagram.com/ahmedabdelhalimolek?igsh=NXZ2a2pnbmNnaDF0"
              class="text-light fs-4"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="https://www.linkedin.com/in/ahmed-abdelhlem-802921302" class="text-light fs-4"
              ><i class="bi bi-linkedin"></i
            ></a>
          </div>
        </div>
          <p class="text-muted small mb-0">
            <i class="bi bi-envelope me-2"></i>support@vuestore.com
          </p>
          <p class="text-muted small mb-0"><i class="bi bi-telephone me-2"></i>+1 (555) 123-4567</p>
        </div>
      </div>
      <hr class="my-4 bg-secondary" />
      <div class="row">
        <div class="col-md-6">
          <p class="text-muted small mb-0">
            &copy; {{ new Date().getFullYear() }} Vue Store. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <a href="#" class="text-muted text-decoration-none small me-3">Privacy Policy</a>
          <a href="#" class="text-muted text-decoration-none small">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>


</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
