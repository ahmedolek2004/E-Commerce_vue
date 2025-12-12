<template>
  <div>
    <section class="slider-wrapper py-4">
      <div class="container">
        <div id="homeSlider" class="carousel slide custom-carousel" data-bs-ride="carousel">
          <div class="carousel-inner rounded-4 shadow-sm">
            <div class="carousel-item active">
              <img src="#" class="d-block w-100" alt="Electronics" />
            </div>

            <div class="carousel-item">
              <img src="#" class="d-block w-100" alt="Books" />
            </div>

            <div class="carousel-item">
              <img src="#" class="d-block w-100" alt="Fashion" />
            </div>

            <div class="carousel-item">
              <img src="#" class="d-block w-100" alt="Toys" />
            </div>

            <div class="carousel-item">
              <img src="#" class="d-block w-100" alt="Sports" />
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#homeSlider"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>

    <!-- ✅ Hero Slider -->
    <section class="hero-slider position-relative">
      <div class="container py-5 text-center">
        <h1 class="display-4 fw-bold text-dark">Welcome to Our Store</h1>
        <p class="lead text-muted mb-4">
          Discover amazing products, hot deals, and top categories.
        </p>
        <RouterLink to="/products" class="btn btn-primary btn-lg me-2"> Shop Now </RouterLink>
        <RouterLink to="/deals" class="btn btn-outline-secondary btn-lg"> View Deals </RouterLink>
      </div>
    </section>

    <!-- ✅ Quick Icon Categories -->
    <section class="container py-5">
      <h3 class="fw-bold mb-4">Shop by Category</h3>
      <div class="row text-center">
        <div class="col-6 col-md-3 mb-4" v-for="cat in categories" :key="cat.name">
          <div class="p-4 shadow-sm rounded hover-card">
            <i :class="cat.icon" class="fs-1 text-primary mb-3"></i>
            <h6>{{ cat.name }}</h6>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ Featured Products -->
    <section class="container py-5">
      <h3 class="fw-bold mb-4">Featured Products</h3>
      <div class="row">
        <div class="col-md-3 mb-4" v-for="p in featured" :key="p.title">
          <div class="card h-100 shadow-sm">
            <img :src="p.img" class="card-img-top" />
            <div class="card-body">
              <h6 class="card-title">{{ p.title }}</h6>
              <p class="text-muted small">{{ p.desc }}</p>
              <RouterLink to="/products" class="btn btn-primary btn-sm">View</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ Deals Section -->
    <section class="bg-warning bg-opacity-25 py-5">
      <div class="container">
        <h3 class="fw-bold mb-4">🔥 Today’s Hot Deals</h3>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="deal in deals" :key="deal.title">
            <div class="card h-100 shadow-sm border-danger">
              <img :src="deal.img" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title text-danger fw-bold">{{ deal.title }}</h6>
                <p class="text-muted small">{{ deal.desc }}</p>
                <RouterLink to="/deals" class="btn btn-danger btn-sm">Grab Deal</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const categories = [
  { name: "Electronics", icon: "bi bi-phone" },
  { name: "Fashion", icon: "bi bi-bag" },
  { name: "Home", icon: "bi bi-house" },
  { name: "Sports", icon: "bi bi-bicycle" },
];

const featured = [
  { title: "Smart Watch", desc: "Latest model 2024", img: "#" },
  { title: "Headphones", desc: "Noise cancelling", img: "#" },
  { title: "Sneakers", desc: "Comfortable & stylish", img: "#" },
  { title: "Laptop", desc: "High performance", img: "#" },
];

const deals = [
  {
    title: "50% Off Headphones",
    desc: "Limited time offer",
    img: "#",
  },
  { title: "Buy 1 Get 1 Free", desc: "Fashion sale", img: "#" },
  { title: "Hot Deal: Smart TV", desc: "Save up to 30%", img: "#" },
];
</script>

<style scoped>
.hero-slider {
  background: url("https://via.placeholder.com/1200x400") center/cover no-repeat;
  color: white;
}

.hover-card {
  transition: 0.3s;
  cursor: pointer;
}
.hover-card:hover {
  transform: translateY(-5px);
  background: #f8f9fa;
}
.slider-wrapper {
  background-color: #f8f9fa;
}

.custom-carousel {
  height: 40vh;
  position: relative;
}

.custom-carousel .carousel-inner {
  height: 100%;
  overflow: hidden;
  border-radius: 15px;
}

.custom-carousel .carousel-item {
  height: 100%;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.custom-carousel .carousel-item img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
}
</style>
