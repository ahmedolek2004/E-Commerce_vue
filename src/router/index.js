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
import SearchPage from '../pages/SearchPage.vue'

// ✅ لازم تستورد auth و db و getDoc من Firebase
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/products', name: 'products', component: ProductsPage },

  {
    path: "/products/:id",
    name: "product-details",
    component: ProductPage
  },

  { path: '/categories', name: 'categories', component: CategoriesPage },
  { path: '/categories/:id', name: 'category', component: CategoryPage },
  { path: '/deals', name: 'deals', component: DealsPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/checkout', name: 'checkout', component: CheckoutPage },
  { path: '/auth', name: 'auth', component: AuthPage },
  { path: '/search', name: 'search', component: SearchPage },

  // ✅ Route الأدمن لازم يكون فيه meta
  { path: '/admin', name: 'admin', component: AdminPage, meta: { requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ دالة helper علشان نستنى المستخدم الحالي
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

// ✅ Guard للأدمن
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    const user = await getCurrentUser()
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid))
      if (docSnap.exists() && docSnap.data().role === "admin") {
        next() // يدخل الأدمن
      } else {
        next("/") // يرجع للهوم لو مش أدمن
      }
    } else {
      next("/auth") // لو مش مسجل دخول يرجعه للـ Auth
    }
  } else {
    next()
  }
})

export default router
