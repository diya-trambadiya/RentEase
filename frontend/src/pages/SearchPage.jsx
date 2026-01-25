"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Search, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/data/products"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

export default function SearchPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get("q") || ""

  const { toast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (error) {
        console.error("Failed to parse recent searches:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (query) {
      performSearch(query)
      saveRecentSearch(query)
    } else {
      setSearchResults([])
    }
  }, [query])

  const saveRecentSearch = (searchTerm) => {
    const updatedSearches = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  const performSearch = (searchTerm) => {
    setIsSearching(true)
    setTimeout(() => {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          categories.find((c) => c.slug === product.category)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
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

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Search Products</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Search Products</h1>

      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for furniture, appliances, electronics, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {isSearching
              ? "Searching..."
              : searchResults.length > 0
              ? `Search results for "${query}" (${searchResults.length} items)`
              : `No results found for "${query}"`}
          </h2>
        </div>
      )}

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
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
                    <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.rating}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  {categories.find((c) => c.slug === product.category)?.name}
                </p>
                <div className="flex justify-between items-center">
                  <p className="font-medium">₹{product.priceDaily}/day</p>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : query && !isSearching ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">We couldn't find any products matching your search.</p>
          <div className="max-w-md mx-auto">
            <h4 className="font-medium mb-2">Suggestions:</h4>
            <ul className="text-gray-600 space-y-1 mb-6">
              <li>Check the spelling of your search term</li>
              <li>Try using more general keywords</li>
              <li>Try searching for a related product category</li>
            </ul>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      ) : !query ? (
        <>
          {recentSearches.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Searches</h2>
                <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <Link
                    key={index}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-700 flex items-center"
                  >
                    <Search className="h-3 w-3 mr-2" />
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.slug}`}
                className="group relative h-48 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              >
                <img
                  src={category.image || "/placeholder.svg?height=300&width=400"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm">Browse products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Refrigerator",
                "TV",
                "Washing Machine",
                "Laptop",
                "Study Table",
                "Bed",
                "Microwave",
                "Induction",
                "Water Purifier",
                "Wardrobe",
              ].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-gray-700"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
