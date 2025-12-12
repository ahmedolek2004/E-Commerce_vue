import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useCartStore = defineStore("cart", () => {

  const cart = ref(JSON.parse(localStorage.getItem("cart")) || [])

  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart.value))
  }

  const addToCart = (product) => {
    const existing = cart.value.find(p => p.id === product.id)

    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({
        id: product.id,
        name: product.title,
        priceValue: product.price,
        image: product.img,
        quantity: 1
      })
    }

    saveCart()
  }

  const removeFromCart = (id) => {
    cart.value = cart.value.filter(p => p.id !== id)
    saveCart()
  }

  const updateQuantity = (id, qty) => {
    const item = cart.value.find(p => p.id === id)
    if (item) {
      item.quantity = qty < 1 ? 1 : qty
      saveCart()
    }
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity * item.priceValue, 0)
  )

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal
  }
})
