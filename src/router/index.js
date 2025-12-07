import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import ProductsPage from '../pages/ProductsPage.vue'
import ProductPage from '../pages/ProductPage.vue'
import CategoriesPage from '../pages/CategoriesPage.vue'
import CategoryPage from '../pages/CategoryPage.vue'
import DealsPage from '../pages/DealsPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ContactPage from '../pages/ContactPage.vue'
import CartPage from '../pages/CartPage.vue'
import CheckoutPage from '../pages/CheckoutPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import AdminPage from '../pages/AdminPage.vue'





const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/products', name: 'products', component: ProductsPage },
  { path: '/products/:id', name: 'product', component: ProductPage },
  { path: '/categories', name: 'categories', component: CategoriesPage },
  { path: '/categories/:id', name: 'category', component: CategoryPage },
  { path: '/deals', name: 'deals', component: DealsPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/checkout', name: 'checkout', component: CheckoutPage },
  { path: '/auth', name: 'auth', component: AuthPage },
    { path: '/admin', component: AdminPage },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
