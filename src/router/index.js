import { createRouter, createWebHistory } from 'vue-router'

// استدعاء الصفحات من مجلد pages
import Home from '../pages/homePage.vue'
import Products from '../pages/ProductPage.vue'
import Deals from '../pages/DealsPage.vue'
import About from '../pages/AboutPage.vue'
import Contact from '../pages/ContactPage.vue'
import Cart from '../pages/CartPage.vue'
import Checkout from '../pages/CheckoutPage.vue'
import Categories from '../pages/CategoriesPage.vue'
import Category from '../pages/Category.vue'
import Auth from '../pages/AuthPage.vue'

// تعريف المسارات (routes)
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/products', name: 'products', component: Products },
  { path: '/deals', name: 'deals', component: Deals },
  { path: '/about', name: 'about', component: About },
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'checkout', component: Checkout },
  { path: '/categories', name: 'categories', component: Categories },
  { path: '/categories/:id', name: 'category', component: Category },
  { path: '/auth', name: 'auth', component: Auth },
  { path: '/products/:id', name: 'product', component: () => import('../pages/ProductPage.vue') },
]

// إنشاء الـ router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
