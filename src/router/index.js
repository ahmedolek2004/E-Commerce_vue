import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const routes = [

  // ✅ Home
  { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },

  // ✅ Products
  { path: '/products', name: 'products', component: () => import('../pages/ProductsPage.vue') },
  { path: '/products/:id', name: 'product-details', component: () => import('../pages/ProductPage.vue') },

  // ✅ Categories
  { path: '/categories', name: 'categories', component: () => import('../pages/CategoriesPage.vue') },
  { path: '/categories/:id', name: 'category', component: () => import('../pages/CategoryPage.vue') },

  // ✅ Deals
  { path: '/deals', name: 'deals', component: () => import('../pages/DealsPage.vue') },

  // ✅ Static Pages
  { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
  { path: '/contact', name: 'contact', component: () => import('../pages/ContactPage.vue') },

  // ✅ Cart
  { path: '/cart', name: 'cart', component: () => import('../pages/CartPage.vue') },

  // ✅ Checkout
  { path: '/checkout', name: 'checkout', component: () => import('../pages/CheckoutPage.vue') },

  // ✅ Auth
  { path: '/auth', name: 'auth', component: () => import('../pages/AuthPage.vue') },

  // ✅ Search
  { path: '/search', name: 'search', component: () => import('../pages/SearchPage.vue') },

  // ✅ Admin (Protected)
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../pages/AdminPage.vue'),
    meta: { requiresAdmin: true }
  },

  // ✅ 404 Page
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFoundPage.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Helper: Get current user
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

// ✅ Admin Guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    const user = await getCurrentUser()

    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid))

      if (docSnap.exists() && docSnap.data().role === "admin") {
        next() // ✅ Admin allowed
      } else {
        next("/") // ❌ Not admin → redirect home
      }

    } else {
      next("/auth") // ❌ Not logged in → redirect to login
    }

  } else {
    next() // ✅ Normal route
  }
})

export default router
