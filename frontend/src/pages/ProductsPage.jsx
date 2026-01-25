"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Slider } from "../components/ui/slider"
import { Checkbox } from "../components/ui/checkbox"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Heart, Filter, X, ChevronDown, ChevronUp, Star, MapPin } from "lucide-react"
import { products, categories } from "../data/products"
import { useWishlist } from "../context/wishlist-context"
import { useToast } from "../components/ui/use-toast"

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const packageParam = searchParams.get("package")
  const { toast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? [categoryParam] : [])
  const [sortOption, setSortOption] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rentalPeriod: true,
    condition: true,
    location: true,
  })

  // Rental-related filter states
  const [selectedRentalPeriods, setSelectedRentalPeriods] = useState([])
  const [selectedConditions, setSelectedConditions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [minArea, setMinArea] = useState("")

  // Available locations
  const locations = [
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

  // Rental periods
  const rentalPeriods = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly (3 months)" },
    { id: "yearly", label: "Yearly" },
  ]

  // Product conditions
  const conditions = [
    { id: "new", label: "Brand New" },
    { id: "like-new", label: "Like New" },
    { id: "good", label: "Good Condition" },
    { id: "refurbished", label: "Refurbished" },
  ]

  // Get max price for slider
  const maxPrice = Math.max(...products.map((p) => p.priceDaily))

  // Filter products based on selected filters
  useEffect(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by package
    if (packageParam) {
      // This is a simplified example - in a real app, you'd have package data
      if (packageParam === "bedroom") {
        result = result.filter((p) => p.category === "bedroom" || p.category === "furniture")
      } else if (packageParam === "living") {
        result = result.filter((p) => p.category === "furniture")
      } else if (packageParam === "electronics") {
        result = result.filter((p) => p.category === "electronics" || p.category === "appliances")
      }
    }

    // Filter by price
    result = result.filter((product) => product.priceDaily >= priceRange[0] && product.priceDaily <= priceRange[1])

    // Sort products
    if (sortOption === "price-low") {
      result.sort((a, b) => a.priceDaily - b.priceDaily)
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.priceDaily - a.priceDaily)
    } else if (sortOption === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOption === "rating-high") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(result)
  }, [selectedCategories, priceRange, sortOption, packageParam])

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Handle rental period selection
  const handleRentalPeriodChange = (periodId) => {
    setSelectedRentalPeriods((prev) =>
      prev.includes(periodId) ? prev.filter((p) => p !== periodId) : [...prev, periodId],
    )
  }

  // Handle condition selection
  const handleConditionChange = (conditionId) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId) ? prev.filter((c) => c !== conditionId) : [...prev, conditionId],
    )
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleWishlistToggle = (product, e) => {
    e.preventDefault()
    e.stopPropagation()

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

  const resetFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, maxPrice])
    setSortOption("featured")
    setSelectedRentalPeriods([])
    setSelectedConditions([])
    setSelectedLocation("")
    setMinArea("")
  }

  // Calculate rental price based on area (for demonstration)
  const calculateRentalPrice = (basePrice, area) => {
    if (!area || isNaN(area) || area <= 0) return basePrice

    // Simple calculation: base price + (area factor * base price)
    const areaFactor = Math.min(area / 1000, 0.5) // Cap at 50% increase
    return Math.round(basePrice * (1 + areaFactor))
  }

  return (
    <>
      <Helmet>
        <title>
          {packageParam
            ? `${packageParam.charAt(0).toUpperCase() + packageParam.slice(1)} Package - RentEase`
            : categoryParam
              ? `${categories.find((c) => c.slug === categoryParam)?.name || "Products"} - RentEase`
              : "All Products - RentEase"}
        </title>
        <meta
          name="description"
          content="Browse our wide selection of furniture, appliances, and electronics for rent. Perfect for PG accommodations and rented homes."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {packageParam
            ? `${packageParam.charAt(0).toUpperCase() + packageParam.slice(1)} Package`
            : categoryParam
              ? `${categories.find((c) => c.slug === categoryParam)?.name || "Products"}`
              : "All Products"}
        </h1>

        {packageParam && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-2">
              {packageParam === "bedroom" && "Complete Bedroom Package"}
              {packageParam === "living" && "Living Room Essentials"}
              {packageParam === "electronics" && "Electronics Package"}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {packageParam === "bedroom" &&
                "Everything you need for a comfortable bedroom setup in your PG or rented apartment."}
              {packageParam === "living" && "Essential furniture for your living room area."}
              {packageParam === "electronics" && "Must-have electronics and appliances for modern living."}
            </p>
            <p className="text-sm font-medium">
              Package rental starts from ₹
              {packageParam === "bedroom" ? "1,499" : packageParam === "living" ? "1,999" : "2,499"}/month
            </p>
          </div>
        )}

        <div className="lg:hidden mb-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <div className="flex items-center">
            <Label htmlFor="mobile-sort" className="text-sm mr-2">
              Sort:
            </Label>
            <select
              id="mobile-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating-high">Highest Rated</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile */}
          {showFilters && (
            <div className="fixed inset-0 bg-white z-50 overflow-auto lg:hidden p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("categories")}
                  >
                    <h3 className="font-bold text-lg">Categories</h3>
                    {expandedSections.categories ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.categories && (
                    <div className="space-y-2 mt-2">
                      {categories
                        .filter((c) =>
                          ["furniture", "electronics", "appliances", "bedroom", "kitchen"].includes(c.slug),
                        )
                        .map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-category-${category.id}`}
                              checked={selectedCategories.includes(category.slug)}
                              onCheckedChange={() => handleCategoryChange(category.slug)}
                            />
                            <Label
                              htmlFor={`mobile-category-${category.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Price Range */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("price")}
                  >
                    <h3 className="font-bold text-lg">Price Range (Daily)</h3>
                    {expandedSections.price ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </div>

                  {expandedSections.price && (
                    <div className="mt-4">
                      <Slider
                        defaultValue={[0, maxPrice]}
                        max={maxPrice}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mb-6"
                      />
                      <div className="flex items-center justify-between">
                        <div className="border rounded-md px-3 py-1">₹{priceRange[0]}</div>
                        <div className="border rounded-md px-3 py-1">₹{priceRange[1]}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Rental Period */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("rentalPeriod")}
                  >
                    <h3 className="font-bold text-lg">Rental Period</h3>
                    {expandedSections.rentalPeriod ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.rentalPeriod && (
                    <div className="space-y-2 mt-2">
                      {rentalPeriods.map((period) => (
                        <div key={period.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-period-${period.id}`}
                            checked={selectedRentalPeriods.includes(period.id)}
                            onCheckedChange={() => handleRentalPeriodChange(period.id)}
                          />
                          <Label htmlFor={`mobile-period-${period.id}`} className="text-sm font-medium leading-none">
                            {period.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Condition */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("condition")}
                  >
                    <h3 className="font-bold text-lg">Condition</h3>
                    {expandedSections.condition ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.condition && (
                    <div className="space-y-2 mt-2">
                      {conditions.map((condition) => (
                        <div key={condition.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-condition-${condition.id}`}
                            checked={selectedConditions.includes(condition.id)}
                            onCheckedChange={() => handleConditionChange(condition.id)}
                          />
                          <Label
                            htmlFor={`mobile-condition-${condition.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {condition.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("location")}
                  >
                    <h3 className="font-bold text-lg">Location</h3>
                    {expandedSections.location ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>

                  {expandedSections.location && (
                    <div className="mt-2">
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mb-3"
                      >
                        <option value="">Select City</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>

                      <div className="mt-3">
                        <Label htmlFor="mobile-area" className="text-sm font-medium mb-1 block">
                          Area (sq. ft) - For Price Calculation
                        </Label>
                        <input
                          id="mobile-area"
                          type="number"
                          placeholder="Enter area in sq. ft"
                          value={minArea}
                          onChange={(e) => setMinArea(e.target.value)}
                          className="w-full border rounded-md px-3 py-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter area to calculate adjusted rental prices</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button variant="outline" onClick={resetFilters} className="w-full">
                  Reset Filters
                </Button>

                <div className="pt-4 border-t">
                  <Button onClick={() => setShowFilters(false)} className="w-full">
                    Show {filteredProducts.length} Results
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <div className="lg:w-1/4 space-y-6 hidden lg:block">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                {categories
                  .filter((c) => ["furniture", "electronics", "appliances", "bedroom", "kitchen"].includes(c.slug))
                  .map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => handleCategoryChange(category.slug)}
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Price Range (Daily)</h2>
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <div className="border rounded-md px-3 py-1">₹{priceRange[0]}</div>
                <div className="border rounded-md px-3 py-1">₹{priceRange[1]}</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Rental Period</h2>
              <div className="space-y-2">
                {rentalPeriods.map((period) => (
                  <div key={period.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={period.id}
                      checked={selectedRentalPeriods.includes(period.id)}
                      onCheckedChange={() => handleRentalPeriodChange(period.id)}
                    />
                    <Label htmlFor={period.id}>{period.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Condition</h2>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <div key={condition.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition.id}
                      checked={selectedConditions.includes(condition.id)}
                      onCheckedChange={() => handleConditionChange(condition.id)}
                    />
                    <Label htmlFor={condition.id}>{condition.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-bold text-lg mb-4">Location</h2>
              <div className="mb-4">
                <Label htmlFor="location" className="text-sm mb-1 block">
                  City
                </Label>
                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select City</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="area" className="text-sm mb-1 block">
                  Area (sq. ft)
                </Label>
                <input
                  id="area"
                  type="number"
                  placeholder="Enter area in sq. ft"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">For rental price calculation</p>
              </div>
            </div>

            <Button variant="outline" onClick={resetFilters} className="w-full">
              Reset Filters
            </Button>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredProducts.length} products found</p>
              <div className="hidden lg:flex items-center space-x-2">
                <Label htmlFor="sort" className="text-sm">
                  Sort by:
                </Label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border rounded-md px-3 py-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating-high">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  // Calculate adjusted price based on area if provided
                  const adjustedPrice = minArea
                    ? calculateRentalPrice(product.priceDaily, Number.parseInt(minArea))
                    : product.priceDaily

                  const adjustedMonthlyPrice = minArea
                    ? calculateRentalPrice(product.priceMonthly, Number.parseInt(minArea))
                    : product.priceMonthly

                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-64">
                        <img
                          src={product.image || "/placeholder.svg?height=300&width=400"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={(e) => handleWishlistToggle(product, e)}
                          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 z-10"
                        >
                          <Heart
                            className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                          />
                        </button>
                        {product.rating && (
                          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                            {product.rating}
                          </div>
                        )}
                        {selectedLocation && (
                          <div className="absolute top-2 left-2 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {selectedLocation}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">
                          {categories.find((c) => c.slug === product.category)?.name}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">₹{adjustedPrice}/day</p>
                            <p className="text-sm text-gray-500">₹{adjustedMonthlyPrice}/month</p>
                            {minArea && (
                              <p className="text-xs text-primary mt-1">*Price adjusted for {minArea} sq.ft</p>
                            )}
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
