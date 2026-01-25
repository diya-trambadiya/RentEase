"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Trash2, Heart, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"
import { useCart } from "../context/cart-context"
import { useWishlist } from "../context/wishlist-context"
import { format, differenceInDays } from "date-fns"
import { products } from "../data/products"

export default function CartPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0)
  const deliveryFee = subtotal > 0 ? 49 : 0
  const securityDeposit = subtotal > 0 ? Math.min(subtotal * 0.1, 2000) : 0
  const total = subtotal + deliveryFee + securityDeposit

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate checkout process
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      navigate("/checkout-success")
    }, 1500)
  }

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return

    updateQuantity(item.productId, new Date(item.startDate), newQuantity)
  }

  const handleMoveToWishlist = (item) => {
    const product = products.find((p) => p.id === item.productId)
    if (product && !isInWishlist(product.id)) {
      addToWishlist(product)
      removeFromCart(item.productId, new Date(item.startDate))
      toast({
        title: "Moved to wishlist",
        description: `${item.name} has been moved to your wishlist.`,
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Your Cart - RentEase</title>
        <meta name="description" content="View and manage your rental cart" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => {
                const rentalDays = differenceInDays(new Date(item.endDate), new Date(item.startDate)) + 1

                return (
                  <div
                    key={`${item.productId}-${item.startDate}`}
                    className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="relative h-32 sm:w-32 rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <Link to={`/products/${item.productId}`}>
                          <h3 className="font-semibold text-lg hover:text-primary">{item.name}</h3>
                        </Link>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Heart className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.productId, new Date(item.startDate))}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(item.startDate), "MMM d, yyyy")} -{" "}
                          {format(new Date(item.endDate), "MMM d, yyyy")}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500">Rental period: {rentalDays} days</div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="border rounded-md p-1 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="border rounded-md p-1 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            ₹{item.priceDaily}/day × {rentalDays} days × {item.quantity}
                          </p>
                          <p className="font-semibold">₹{item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Have a coupon?</h3>
                <div className="flex">
                  <input type="text" placeholder="Enter coupon code" className="border rounded-l-md px-3 py-2 flex-1" />
                  <Button className="rounded-l-none">Apply</Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-fit space-y-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-600">Security Deposit</span>
                    <div className="relative group ml-1">
                      <Info className="h-4 w-4 text-gray-400" />
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-black text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Refundable security deposit. Will be returned when you return the items in good condition.
                      </div>
                    </div>
                  </div>
                  <span>₹{securityDeposit.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                <p className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Free delivery and setup
                </p>
                <p className="flex items-center mt-1">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Free pickup at end of rental
                </p>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Need help? Contact our customer support</p>
                <p>support@rentease.com</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

function Info({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function Check({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Calendar({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
