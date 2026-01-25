"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { CalendarIcon, Heart, ShoppingCart, Check, Star, Shield, Truck, ArrowRight, MapPin } from "lucide-react"
import { Calendar } from "../components/ui/calendar"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useToast } from "../components/ui/use-toast"
import { useCart } from "../context/cart-context"
import { useWishlist } from "../context/wishlist-context"
import { products, categories } from "../data/products"
import { format, differenceInDays } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"

export default function ProductDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const productId = params.id
  const product = products.find((p) => p.id.toString() === productId)

  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  })

  const [quantity, setQuantity] = useState(1)
  const [showCalendar, setShowCalendar] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedCity, setSelectedCity] = useState("")

  // Available cities
  const cities = [
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Surat",
  ]

  // Generate multiple product images for the gallery
  const productImages = [
    product?.image || "/placeholder.svg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </div>
    )
  }

  const category = categories.find((c) => c.slug === product.category)

  // Calculate rental duration and total price
  const rentalDays = dateRange.from && dateRange.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 0

  let totalPrice = 0

  if (rentalDays >= 30) {
    totalPrice = Math.floor(rentalDays / 30) * product.priceMonthly + (rentalDays % 30) * product.priceDaily
  } else if (rentalDays >= 7) {
    totalPrice = Math.floor(rentalDays / 7) * product.priceWeekly + (rentalDays % 7) * product.priceDaily
  } else {
    totalPrice = rentalDays * product.priceDaily
  }

  totalPrice *= quantity

  const handleAddToCart = () => {
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Please select rental dates",
        description: "You need to select both start and end dates for your rental period.",
        variant: "destructive",
      })
      return
    }

    if (!selectedCity) {
      toast({
        title: "Please select a city",
        description: "You need to select a delivery city for your rental.",
        variant: "destructive",
      })
      return
    }

    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      priceDaily: product.priceDaily,
      quantity,
      startDate: dateRange.from,
      endDate: dateRange.to,
      totalPrice,
      city: selectedCity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - RentEase</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <Link to={`/products?category=${category?.slug}`} className="hover:text-primary">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={productImages[activeImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart
                  className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </button>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                {product.rating} ({product.reviews} reviews)
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, i) => (
                <div
                  key={i}
                  className={`relative h-24 rounded-md overflow-hidden border cursor-pointer hover:border-primary ${
                    activeImageIndex === i ? "border-primary border-2" : ""
                  }`}
                  onClick={() => setActiveImageIndex(i)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-1">
                <p className="text-gray-500">{category?.name}</p>
                <div className="flex items-center ml-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="mt-2 text-gray-700">{product.shortDescription}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Rental Pricing</h2>
              <div className="flex space-x-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Daily</p>
                  <p className="font-bold">₹{product.priceDaily}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Weekly</p>
                  <p className="font-bold">₹{product.priceWeekly}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Monthly</p>
                  <p className="font-bold">₹{product.priceMonthly}</p>
                </div>
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Select City for Delivery <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Select Rental Period</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                          </>
                        ) : (
                          format(dateRange.from, "PPP")
                        )
                      ) : (
                        "Select rental dates"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>

                {dateRange.from && dateRange.to && (
                  <div className="mt-4 p-3 bg-white rounded-md border">
                    <p className="text-sm text-gray-500">Rental Duration</p>
                    <p className="font-medium">{rentalDays} days</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="quantity" className="block text-sm text-gray-500 mb-1">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md px-3 py-2"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Total Price</p>
                <p className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={handleWishlist}>
                <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                {isInWishlist(product.id) ? "Remove" : "Wishlist"}
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 mt-0.5 text-primary" />
                <p>Free delivery and setup within city limits.</p>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 mt-0.5 text-primary" />
                <p>Security deposit may be required (refundable).</p>
              </div>
              {selectedCity && (
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <p>Delivery available in {selectedCity}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 bg-white rounded-md mt-2">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  This premium {product.name.toLowerCase()} is perfect for both PG accommodations and rented homes.
                  Crafted with high-quality materials, it combines style, comfort, and durability to enhance any space.
                </p>
                <p>
                  Our rental service includes delivery, setup, and pickup, ensuring a hassle-free experience from start
                  to finish.
                </p>

                <h3 className="text-lg font-semibold mt-4">Key Benefits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="p-4 bg-white rounded-md mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([category, specs]) => (
                  <div key={category}>
                    <h3 className="font-semibold mb-2 capitalize">{category}</h3>
                    <ul className="space-y-1 text-gray-700">
                      {Object.entries(specs).map(([key, value]) => (
                        <li key={key} className="flex justify-between border-b pb-1">
                          <span className="text-gray-600">{key}</span>
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 bg-white rounded-md mt-2">
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="font-medium">{product.rating} out of 5</p>
                  <p className="text-gray-500 ml-2">({product.reviews} reviews)</p>
                </div>

                {product.reviewList.map((review, index) => (
                  <div key={index} className="border-t pt-4">
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                        <img
                          src={review.avatar || "/images/testimonial-1.jpg"}
                          alt="Reviewer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-gray-500">
                          {review.date} • Rented for {review.rentalPeriod}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="faq" className="p-4 bg-white rounded-md mt-2">
              <div className="space-y-4">
                {product.faqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <Button asChild variant="outline" size="sm">
              <Link to={`/products?category=${product.category}`}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                      {relatedProduct.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-700">₹{relatedProduct.priceDaily}/day</p>
                      <p className="text-sm text-gray-500">₹{relatedProduct.priceMonthly}/month</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
