"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Search, ShoppingCart, Heart, User, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

// ✅ IMPORT CONTEXT HOOKS
import { useCart } from "../context/cart-context"
import { useWishlist } from "../context/wishlist-context"

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Bangalore")
  const [isScrolled, setIsScrolled] = useState(false)

  // ✅ GET STATE FROM CONTEXT (THIS FIXES THE ISSUE)
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  const cartCount = cart.length
  const wishlistCount = wishlist.length

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

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity")
    if (storedCity) setSelectedCity(storedCity)

    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCityChange = (city) => {
    setSelectedCity(city)
    localStorage.setItem("selectedCity", city)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary mr-8">
              RentEase
            </Link>

            <nav className="hidden md:flex space-x-6">
              {[
                { path: "/", label: "Home" },
                { path: "/products", label: "Products" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === path || pathname.startsWith(path + "/")
                      ? "text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center space-x-4">
            {/* City Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center text-sm">
                  {selectedCity} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {cities.map((city) => (
                  <DropdownMenuItem key={city} onClick={() => handleCityChange(city)}>
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/search">
              <Search className="h-5 w-5 text-gray-600 hover:text-primary" />
            </Link>

            {/* ❤️ WISHLIST */}
            <Link to="/wishlist" className="relative">
              <Heart className="h-5 w-5 text-gray-600 hover:text-primary" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* 🛒 CART */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-600 hover:text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* USER */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/auth/sign-in">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/auth/sign-up">Sign Up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* MOBILE MENU */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {["/", "/products", "/about", "/contact"].map((path) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-primary"
                >
                  {path === "/" ? "Home" : path.replace("/", "")}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
