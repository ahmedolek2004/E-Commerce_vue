<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section position-relative overflow-hidden">
      <div class="container py-5">
        <div class="row align-items-center min-vh-40">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <div class="hero-content">
              <div class="mb-4">
                <span class="badge bg-primary bg-opacity-10 text-primary fs-6 px-4 py-2 mb-3 d-inline-block">
                  <i class="bi bi-star-fill me-2"></i>Premium Collection
                </span>
              </div>
              <h1 class="display-4 fw-bold mb-4">
                Discover Amazing <span class="text-gradient">Products</span> & Great Deals
              </h1>
              <p class="lead text-muted mb-5">
                Explore our curated collection of premium products, exclusive offers,
                and limited-time deals. Quality meets affordability.
              </p>
              <div class="d-flex flex-wrap gap-3">
                <RouterLink to="/products" class="btn btn-primary btn-lg px-5 py-3 fw-semibold">
                  <i class="bi bi-bag me-2"></i>Shop Now
                </RouterLink>
                <RouterLink to="/deals" class="btn btn-outline-dark btn-lg px-5 py-3 fw-semibold">
                  <i class="bi bi-fire me-2"></i>Hot Deals
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="hero-image-wrapper position-relative">
              <div class="floating-card card-1">
                <img src="/images/2.png" alt="Electronics" class="img-fluid rounded-3 shadow-lg" />
              </div>
              <div class="floating-card card-2">
                <img src="/images/3.png" alt="Books" class="img-fluid rounded-3 shadow-lg" />
              </div>
              <div class="floating-card card-3">
                <img src="/images/4.png" alt="Fashion" class="img-fluid rounded-3 shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="container mt-5 pt-5">
        <div class="row g-4 text-center">
          <div class="col-md-3 col-6">
            <div class="stat-card p-3">
              <div class="stat-icon mb-3">
                <i class="bi bi-box-seam display-6 text-primary"></i>
              </div>
              <h3 class="fw-bold">500+</h3>
              <p class="text-muted mb-0">Products</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="stat-card p-3">
              <div class="stat-icon mb-3">
                <i class="bi bi-people display-6 text-success"></i>
              </div>
              <h3 class="fw-bold">10K+</h3>
              <p class="text-muted mb-0">Customers</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="stat-card p-3">
              <div class="stat-icon mb-3">
                <i class="bi bi-truck display-6 text-warning"></i>
              </div>
              <h3 class="fw-bold">24hr</h3>
              <p class="text-muted mb-0">Delivery</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="stat-card p-3">
              <div class="stat-icon mb-3">
                <i class="bi bi-star display-6 text-info"></i>
              </div>
              <h3 class="fw-bold">4.8</h3>
              <p class="text-muted mb-0">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Slider -->
    <section class="slider-section py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold mb-0">Featured Collections</h2>
          <RouterLink to="/products" class="text-decoration-none">
            <span class="text-primary fw-semibold">
              View All <i class="bi bi-arrow-right"></i>
            </span>
          </RouterLink>
        </div>

        <div id="mainSlider" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <!-- Slide 1 -->
            <div class="carousel-item active">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="slider-card featured-card bg-dark text-white rounded-4 overflow-hidden">
                    <img src="/images/2.png" alt="Electronics" class="img-fluid w-100 h-100 object-fit-cover" />
                    <div class="overlay-content p-5">
                      <h3 class="fw-bold mb-3">Electronics Collection</h3>
                      <p class="mb-4">Latest gadgets & smart devices</p>
                      <RouterLink to="/category/electronics" class="btn btn-light">
                        Shop Electronics
                      </RouterLink>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="slider-card featured-card bg-primary text-white rounded-4 overflow-hidden">
                    <img src="/images/3.png" alt="Books" class="img-fluid w-100 h-100 object-fit-cover" />
                    <div class="overlay-content p-5">
                      <h3 class="fw-bold mb-3">Books & Education</h3>
                      <p class="mb-4">Knowledge for everyone</p>
                      <RouterLink to="/category/books" class="btn btn-light">
                        Explore Books
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2 -->
            <div class="carousel-item">
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="slider-card featured-card bg-success text-white rounded-4 overflow-hidden">
                    <img src="/images/4.png" alt="Fashion" class="img-fluid w-100 h-100 object-fit-cover" />
                    <div class="overlay-content p-5">
                      <h3 class="fw-bold mb-3">Fashion & Style</h3>
                      <p class="mb-4">Trendy outfits for everyone</p>
                      <RouterLink to="/category/fashion" class="btn btn-light">
                        Shop Fashion
                      </RouterLink>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="slider-card featured-card bg-warning text-white rounded-4 overflow-hidden">
                    <img src="/images/5.png" alt="Toys" class="img-fluid w-100 h-100 object-fit-cover" />
                    <div class="overlay-content p-5">
                      <h3 class="fw-bold mb-3">Toys & Games</h3>
                      <p class="mb-4">Fun for all ages</p>
                      <RouterLink to="/category/toys" class="btn btn-light">
                        Explore Toys
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#mainSlider" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#mainSlider" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold mb-3">Featured Products</h2>
          <p class="text-muted lead">Handpicked selection of our best products</p>
        </div>

        <div class="row g-4">
          <div class="col-xl-3 col-lg-4 col-md-6" v-for="(product, index) in featured" :key="index">
            <div class="card product-card border-0 shadow-sm h-100 overflow-hidden">
              <div class="product-image-wrapper position-relative">
                <img :src="product.img" :alt="product.title" class="card-img-top" />
                <div class="product-overlay">
                  <button class="btn btn-primary btn-sm">
                    <i class="bi bi-eye me-1"></i>Quick View
                  </button>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-semibold">{{ product.title }}</h5>
                <p class="card-text text-muted small flex-grow-1">{{ product.desc }}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <span class="h5 fw-bold text-primary mb-0">${{ 99 + index * 50 }}</span>
                  <RouterLink to="/products" class="btn btn-outline-primary btn-sm">
                    View Details
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hot Deals -->
    <section class="hot-deals py-5 position-relative overflow-hidden">
      <div class="container position-relative z-1">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 class="fw-bold mb-2">
              <i class="bi bi-fire text-danger me-2"></i>Today's Hot Deals
            </h2>
            <p class="text-muted mb-0">Limited time offers - Don't miss out!</p>
          </div>
          <div class="countdown bg-danger text-white px-4 py-2 rounded-pill">
            <i class="bi bi-clock me-2"></i>Offer ends in: 24:59:59
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(deal, index) in deals" :key="index">
            <div class="card deal-card border-0 shadow-lg h-100 overflow-hidden">
              <div class="deal-badge">-50%</div>
              <div class="deal-image-wrapper">
                <img :src="deal.img" :alt="deal.title" class="card-img-top" />
              </div>
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ deal.title }}</h5>
                <p class="card-text text-muted">{{ deal.desc }}</p>
                <div class="d-flex align-items-center mb-3">
                  <span class="h4 fw-bold text-danger me-2">${{ 49 + index * 20 }}</span>
                  <span class="text-decoration-line-through text-muted">${{ 99 + index * 40 }}</span>
                </div>
                <div class="progress mb-3" style="height: 8px;">
                  <div class="progress-bar bg-danger" :style="{ width: `${70 - index * 10}%` }"></div>
                </div>
                <p class="text-muted small mb-3">
                  <i class="bi bi-exclamation-circle me-1"></i>
                  Only {{ 15 - index * 3 }} left in stock
                </p>
                <RouterLink to="/deals" class="btn btn-danger w-100 py-3 fw-semibold">
                  <i class="bi bi-bag-check me-2"></i>Grab This Deal
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <div class="card border-0 shadow-sm bg-primary text-white py-5 px-4 rounded-4">
              <div class="card-body">
                <i class="bi bi-envelope display-1 mb-4"></i>
                <h2 class="fw-bold mb-3">Stay Updated</h2>
                <p class="mb-4 opacity-75">
                  Subscribe to our newsletter and get exclusive deals, new arrivals,
                  and special offers directly to your inbox.
                </p>
                <div class="input-group input-group-lg mb-3">
                  <input type="email" class="form-control" placeholder="Enter your email" />
                  <button class="btn btn-light text-primary fw-semibold" type="button">
                    Subscribe
                  </button>
                </div>
                <p class="small opacity-75">
                  <i class="bi bi-shield-check me-1"></i>
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import "@/assets/global.css";
import { RouterLink } from "vue-router";

const featured = [
  {
    title: "Smart Watch Series 8",
    desc: "Advanced health monitoring, 24/7 heart rate tracking, sleep analysis, and seamless connectivity",
    img: "/images/product40.png"
  },
  {
    title: "Noise Cancelling Headphones",
    desc: "Premium sound quality with active noise cancellation and 30-hour battery life",
    img: "/images/product47.png"
  },
  {
    title: "Premium Sneakers",
    desc: "Comfortable athletic shoes with superior cushioning and stylish design",
    img: "/images/product46.png"
  },
  {
    title: "Gaming Laptop Pro",
    desc: "High-performance laptop with RTX graphics for ultimate gaming experience",
    img: "/images/product34.png"
  },
];

const deals = [
  {
    title: "Premium Smartphones",
    desc: "Latest models with 50% discount. Limited stock available!",
    img: "/images/1.png",
  },
  {
    title: "Fashion Collection",
    desc: "Buy 1 Get 1 Free on selected items. Limited time offer!",
    img: "/images/product26.png"
  },
  {
    title: "4K Smart TV",
    desc: "Save up to 30% on premium smart TVs with 3-year warranty",
    img: "/images/product41.png"
  },
];
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding-top: 2rem;
}

.hero-image-wrapper {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.floating-card:hover {
  transform: translateY(-10px);
}

.card-1 {
  width: 250px;
  top: 0;
  left: 0;
  z-index: 3;
  animation: float-1 6s ease-in-out infinite;
}

.card-2 {
  width: 220px;
  top: 100px;
  right: 50px;
  z-index: 2;
  animation: float-2 7s ease-in-out infinite;
}

.card-3 {
  width: 200px;
  bottom: 0;
  left: 100px;
  z-index: 1;
  animation: float-3 8s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.text-gradient {
  background: linear-gradient(90deg, #4a6cf7, #6a11cb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  display: inline-flex;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(var(--bs-primary-rgb), 0.1);
}

.slider-section .carousel-item {
  padding: 1rem;
}

.featured-card {
  height: 400px;
  position: relative;
}

.featured-card img {
  transition: transform 0.5s ease;
}

.featured-card:hover img {
  transform: scale(1.05);
}

.overlay-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.product-card {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.product-image-wrapper {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.product-image-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image-wrapper img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.hot-deals {
  background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%);
  position: relative;
}

.hot-deals::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
   background: #e5e5e5
}

.deal-card {
  border-radius: 16px;
  position: relative;
  transition: transform 0.3s ease;
}

.deal-card:hover {
  transform: translateY(-10px);
}

.deal-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ff4444;
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  z-index: 2;
}

.deal-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.deal-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.deal-card:hover .deal-image-wrapper img {
  transform: scale(1.1);
}

.countdown {
  font-size: 1.1rem;
  font-weight: 600;
}

.newsletter .card {
  background: linear-gradient(135deg, #4a6cf7 0%, #6a11cb 100%);
}

@media (max-width: 992px) {
  .hero-image-wrapper {
    height: 400px;
  }

  .floating-card {
    width: 200px !important;
  }

  .card-1 { left: 10px; }
  .card-2 { right: 10px; }
  .card-3 { left: 50px; }
}

@media (max-width: 768px) {
  .hero-image-wrapper {
    height: 300px;
    margin-top: 2rem;
  }

  .floating-card {
    width: 150px !important;
  }

  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
