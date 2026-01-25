import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import { CartProvider } from "./context/cart-context"
import { WishlistProvider } from "./context/wishlist-context"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage"
import SearchPage from "./pages/SearchPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import OrdersPage from "./pages/OrdersPage"
import AddressesPage from "./pages/AddressesPage"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout-success" element={<CheckoutSuccessPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="auth/sign-in" element={<SignInPage />} />
              <Route path="auth/sign-up" element={<SignUpPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="addresses" element={<AddressesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
