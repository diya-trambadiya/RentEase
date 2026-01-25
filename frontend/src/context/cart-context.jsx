"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Convert string dates back to Date objects
        const cartWithDates = parsedCart.map((item) => ({
          ...item,
          startDate: new Date(item.startDate),
          endDate: new Date(item.endDate),
        }))
        setCart(cartWithDates)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      // Check if the item already exists with the same product ID and dates
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.startDate.getTime() === newItem.startDate.getTime() &&
          item.endDate.getTime() === newItem.endDate.getTime(),
      )

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity,
          totalPrice: updatedCart[existingItemIndex].totalPrice + newItem.totalPrice,
        }
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (productId, startDate) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.productId === productId && item.startDate.getTime() === startDate.getTime())),
    )
  }

  const updateQuantity = (productId, startDate, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.productId === productId && item.startDate.getTime() === startDate.getTime()) {
          const pricePerUnit = item.totalPrice / item.quantity
          return {
            ...item,
            quantity,
            totalPrice: pricePerUnit * quantity,
          }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
