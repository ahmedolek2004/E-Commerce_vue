<template>
  <footer class="bg-dark text-white py-5 mt-5">
    <div class="container">
      <div class="row g-4">
        <!-- Brand & About -->
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <div class="footer-brand mb-4">
            <RouterLink to="/" class="text-decoration-none d-flex align-items-center">
              <i class="bi bi-shop-window fs-2 text-warning me-2"></i>
              <span class="h3 fw-bold text-white">Shop<span class="text-warning">Hub</span></span>
            </RouterLink>
          </div>
          <p class="text-light mb-4 opacity-75" style="line-height: 1.8;">
            Your premier destination for quality products with exceptional service.
            We're committed to providing you with the best shopping experience,
            combining great prices with fast, reliable delivery.
          </p>
          <div class="trust-badges d-flex flex-wrap gap-2">
            <span class="badge bg-success bg-opacity-10 text-success border border-success px-3 py-2">
              <i class="bi bi-shield-check me-1"></i>Secure Shopping
            </span>
            <span class="badge bg-primary bg-opacity-10 text-primary border border-primary px-3 py-2">
              <i class="bi bi-truck me-1"></i>Fast Delivery
            </span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-3 col-sm-6 mb-4 mb-md-0">
          <h5 class="fw-bold mb-4 text-warning">Shop</h5>
          <ul class="list-unstyled">
            <li class="mb-3">
              <RouterLink to="/" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Home
              </RouterLink>
            </li>
            <li class="mb-3">
              <RouterLink to="/products" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>All Products
              </RouterLink>
            </li>
            <li class="mb-3">
              <RouterLink to="/categories" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Categories
              </RouterLink>
            </li>
            <li class="mb-3">
              <RouterLink to="/deals" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Hot Deals
                <span class="badge bg-danger ms-2">HOT</span>
              </RouterLink>
            </li>
            <li class="mb-3">
              <RouterLink to="/cart" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Shopping Cart
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="col-lg-2 col-md-3 col-sm-6 mb-4 mb-md-0">
          <h5 class="fw-bold mb-4 text-warning">Support</h5>
          <ul class="list-unstyled">
            <li class="mb-3">
              <RouterLink to="/about" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>About Us
              </RouterLink>
            </li>
            <li class="mb-3">
              <RouterLink to="/contact" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Contact Us
              </RouterLink>
            </li>
            <li class="mb-3">
              <a href="#" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Shipping Policy
              </a>
            </li>
            <li class="mb-3">
              <a href="#" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>Return Policy
              </a>
            </li>
            <li class="mb-3">
              <a href="#" class="text-light text-decoration-none d-flex align-items-center hover-link">
                <i class="bi bi-chevron-right me-2 small"></i>FAQ
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact & Social -->
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-4 text-warning">Stay Connected</h5>

          <!-- Newsletter -->
          <div class="newsletter mb-4">
            <p class="text-light opacity-75 mb-3">Subscribe to our newsletter for updates</p>
            <div class="input-group">
              <input type="email" class="form-control bg-dark border-secondary text-light"
                     placeholder="Enter your email">
              <button class="btn btn-warning" type="button">
                <i class="bi bi-send"></i>
              </button>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-media mb-4">
            <h6 class="fw-bold mb-3">Follow Us</h6>
            <div class="d-flex gap-3">
              <a href="https://www.facebook.com/ahmed.abdelhlem.9615"
                 target="_blank"
                 class="social-icon facebook">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="https://x.com/AhmedAbdelhle10"
                 target="_blank"
                 class="social-icon twitter">
                <i class="bi bi-twitter-x"></i>
              </a>
              <a href="https://www.instagram.com/ahmedabdelhalimolek"
                 target="_blank"
                 class="social-icon instagram">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/ahmed-abdelhlem-802921302"
                 target="_blank"
                 class="social-icon linkedin">
                <i class="bi bi-linkedin"></i>
              </a>
              <a href="https://wa.me/201008349894"
                 target="_blank"
                 class="social-icon whatsapp">
                <i class="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-envelope me-3 text-warning"></i>
              <div>
                <small class="text-light opacity-75 d-block">Email us</small>
                <a href="mailto:support@shophub.com" class="text-light text-decoration-none fw-semibold">
                  ahmedolek2004@gmail.com
                </a>
              </div>
            </div>
            <div class="d-flex align-items-center mb-3">
              <i class="bi bi-telephone me-3 text-warning"></i>
              <div>
                <small class="text-light opacity-75 d-block">Call us</small>
                <a href="tel:+15551234567" class="text-light text-decoration-none fw-semibold">
                  +20 (100) 834-9894
                </a>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <i class="bi bi-clock me-3 text-warning"></i>
              <div>
                <small class="text-light opacity-75 d-block">Working Hours</small>
                <span class="text-light fw-semibold">Daily 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-5 bg-secondary opacity-25">

      <!-- Bottom Footer -->
      <div class="row align-items-center">
        <div class="col-md-6 mb-3 mb-md-0">
          <p class="text-light opacity-75 mb-0">
            &copy; {{ new Date().getFullYear() }} ShopHub. All rights reserved.
          </p>
          <small class="text-light opacity-50">
            Made with <i class="bi bi-heart-fill text-danger"></i> for the Team Plan B
          </small>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="d-flex flex-wrap justify-content-md-end gap-3">
            <a href="#" class="text-light opacity-75 text-decoration-none hover-link">
              Privacy Policy
            </a>
            <span class="text-light opacity-50">•</span>
            <a href="#" class="text-light opacity-75 text-decoration-none hover-link">
              Terms of Service
            </a>
            <span class="text-light opacity-50">•</span>
            <a href="#" class="text-light opacity-75 text-decoration-none hover-link">
              Cookie Policy
            </a>
            <span class="text-light opacity-50">•</span>
            <RouterLink to="/admin" v-if="isAdmin" class="text-warning text-decoration-none hover-link">
              <i class="bi bi-shield-check me-1"></i>Admin
            </RouterLink>
          </div>
          <div class="mt-2">
            <small class="text-light opacity-50">
              <i class="bi bi-shield-check me-1"></i>SSL Secured • PCI Compliant
            </small>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const isAdmin = ref(false)
const adminEmails = ['admin@example.com', 'ahmed@example.com', 'test@test.com']

// Check admin status
const checkAdminStatus = async (user) => {
  if (!user) return false

  // Check email list
  if (adminEmails.includes(user.email)) {
    isAdmin.value = true
    return
  }

  // Check Firestore role
  try {
    const snap = await getDoc(doc(db, "users", user.uid))
    if (snap.exists() && snap.data().role === "admin") {
      isAdmin.value = true
      return
    }
  } catch (error) {
    console.error("Error checking admin status:", error)
  }

  isAdmin.value = false
}

// Track auth state
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      checkAdminStatus(user)
    } else {
      isAdmin.value = false
    }
  })
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.hover-link {
  transition: all 0.3s ease;
  opacity: 0.75;
}

.hover-link:hover {
  opacity: 1;
  color: #ffc107 !important;
  transform: translateX(5px);
}

.social-media a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.social-media a:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-media .facebook:hover {
  background: #1877f2;
  color: white;
}

.social-media .twitter:hover {
  background: #000000;
  color: white;
}

.social-media .instagram:hover {
  background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
  color: white;
}

.social-media .linkedin:hover {
  background: #0077b5;
  color: white;
}

.social-media .whatsapp:hover {
  background: #25d366;
  color: white;
}

.contact-info a:hover {
  color: #ffc107 !important;
}

.newsletter .form-control {
  border-color: #495057;
}

.newsletter .form-control:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
}

.trust-badges .badge {
  transition: all 0.3s ease;
}

.trust-badges .badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer {
    text-align: center;
  }

  .social-media {
    justify-content: center;
  }

  .contact-info .d-flex {
    justify-content: center;
  }

  .trust-badges {
    justify-content: center;
  }

  .hover-link {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .social-media a {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .footer-brand {
    justify-content: center;
  }
}
</style>
