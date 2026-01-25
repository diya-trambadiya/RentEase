"use client"

import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Trash2, Heart, ShoppingBag } from "lucide-react"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"
import { useWishlist } from "../context/wishlist-context"
import { useCart } from "../context/cart-context"

export default function WishlistPage() {
  const { toast } = useToast()
  const { wishlist, removeFromWishlist, clearWishlist, addToWishlist } = useWishlist() // Assuming `addToWishlist` exists
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    // Add with default 7-day rental period
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 7)

    const rentalDays = 7
    let totalPrice = 0

    if (rentalDays >= 30) {
      totalPrice = Math.floor(rentalDays / 30) * product.priceMonthly + (rentalDays % 30) * product.priceDaily
    } else if (rentalDays >= 7) {
      totalPrice = Math.floor(rentalDays / 7) * product.priceWeekly + (rentalDays % 7) * product.priceDaily
    } else {
      totalPrice = rentalDays * product.priceDaily
    }

    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      priceDaily: product.priceDaily,
      quantity: 1,
      startDate,
      endDate,
      totalPrice,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart for a 7-day rental.`,
    })
  }

  const handleAddToWishlist = (product) => {
    addToWishlist(product)
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }


  

  return (
    <>
      <Helmet>
        <title>Your Wishlist - RentEase</title>
        <meta name="description" content="View and manage your wishlist items" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist ({wishlist.length})</h1>

        {wishlist.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{wishlist.length} items in your wishlist</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearWishlist()
                  toast({
                    title: "Wishlist cleared",
                    description: "All items have been removed from your wishlist.",
                  })
                }}
              >
                Clear Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        removeFromWishlist(product.id)
                        toast({
                          title: "Removed from wishlist",
                          description: `${product.name} has been removed from your wishlist.`,
                        })
                      }}
                      className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">₹{product.priceDaily}/day</p>
                      <p className="text-gray-700">₹{product.priceMonthly}/month</p>
                    </div>
                    <Button onClick={() => handleAddToCart(product)} className="w-full" size="sm">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleAddToWishlist(product)}
                      className="w-full mt-2"
                      variant="outline"
                      size="sm"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you like to your wishlist so you can easily find them later.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
