import { Outlet } from "react-router-dom"
import { Toaster } from "./ui/toaster"
import Navbar from "./navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">RentEase</h3>
              <p className="text-gray-600">
                Quality furniture and appliance rentals for PG accommodations and rented homes.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-gray-600 hover:text-gray-900">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/search" className="text-gray-600 hover:text-gray-900">
                    Search
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className="text-gray-600 hover:text-gray-900">
                    Wishlist
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-600">
                123 Rental Street
                <br />
                Bangalore, KA 560001
                <br />
                contact@rentease.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} RentEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </>
  )
}

export default Layout
