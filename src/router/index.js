import { createRouter, createWebHistory } from "vue-router"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { checkAdminRole } from "../utils/admin"

const routes = [
  { path: "/profile", name: "profile", meta: { requireAuth: true }, component: () => import("../pages/profilePage.vue") },
  { path: "/orders", name: "orders", meta: { requireAuth: true }, component: () => import("../pages/OrdersPage.vue") },
  { path: "/wishlist", name: "wishlist", meta: { requireAuth: true }, component: () => import("../pages/WishlistPage.vue") },

  { path: "/", name: "home", component: () => import("../pages/homePage.vue") },
  { path: "/products", name: "products", component: () => import("../pages/productsPage.vue") },
  { path: "/products/:id", name: "product-details", component: () => import("../pages/ProductPage.vue") },
  { path: "/categories", name: "categories", component: () => import("../pages/CategoriesPage.vue") },
  { path: "/categories/:id", name: "category", component: () => import("../pages/CategoryPage.vue") },
  { path: "/deals", name: "deals", component: () => import("../pages/DealsPage.vue") },
  { path: "/about", name: "about", component: () => import("../pages/AboutPage.vue") },
  { path: "/contact", name: "contact", component: () => import("../pages/ContactPage.vue") },
  { path: "/cart", name: "cart", component: () => import("../pages/CartPage.vue") },
  { path: "/checkout", name: "checkout", component: () => import("../pages/CheckoutPage.vue") },
  { path: "/auth", name: "auth", component: () => import("../pages/AuthPage.vue") },
  { path: "/search", name: "search", component: () => import("../pages/SearchPage.vue") },

  {
    path: "/admin",
    component: () => import("../layouts/AdminLayoutPage.vue"),
    meta: { requiresAdmin: true },
    children: [
      { path: "", component: () => import("../Admin/Tabs/AdminDashboard.vue") },
      { path: "users", component: () => import("../Admin/Tabs/AdminUsers.vue") },
      { path: "products", component: () => import("../Admin/Tabs/AdminProducts.vue") },
      { path: "categories", component: () => import("../Admin/Tabs/AdminCategories.vue") },
      { path: "deals", component: () => import("../Admin/Tabs/AdminDeals.vue") },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../pages/NotFoundPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()

  if (to.meta.requireAuth && !user) {
    next("/auth")
    return
  }

  if (to.meta.requiresAdmin) {
    if (user && await checkAdminRole(user)) {
      next()
    } else {
      next(user ? "/" : "/auth")
    }
    return
  }

  next()
})

export default router
