
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Package, ChevronRight, Calendar, MapPin, Clock, AlertCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useAuth } from "../context/auth-context"
import { format } from "date-fns"

// Demo order data
const demoOrders = [
  {
    id: "ORD123456789",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "delivered",
    total: 3499,
    items: [
      {
        id: 1,
        name: "32-inch LED Smart TV",
        image: "/images/product-tv-32.jpg",
        quantity: 1,
        price: 1499,
        rentalPeriod: "1 month",
      },
      {
        id: 7,
        name: "Study Table & Chair Set",
        image: "/images/product-study-set.jpg",
        quantity: 1,
        price: 1199,
        rentalPeriod: "1 month",
      },
      {
        id: 5,
        name: "Induction Cooktop",
        image: "/images/product-induction.jpg",
        quantity: 1,
        price: 899,
        rentalPeriod: "1 month",
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    paymentMethod: "card",
  },
  {
    id: "ORD987654321",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    status: "active",
    total: 2999,
    items: [
      {
        id: 6,
        name: "Laptop (Core i5, 8GB RAM)",
        image: "/images/product-laptop.jpg",
        quantity: 1,
        price: 2999,
        rentalPeriod: "1 month",
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    paymentMethod: "upi",
  },
  {
    id: "ORD456789123",
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: "returned",
    total: 1799,
    items: [
      {
        id: 8,
        name: "Single Bed with Mattress",
        image: "/images/product-single-bed.jpg",
        quantity: 1,
        price: 1799,
        rentalPeriod: "1 month",
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    paymentMethod: "cod",
  },
]

export default function OrdersPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate("/auth/sign-in?redirect=/orders")
      return
    }

    // In a real app, you would fetch orders from an API
    // For demo purposes, we'll use the demo orders
    setOrders(demoOrders)
  }, [user, navigate])

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-purple-100 text-purple-800"
      case "returned":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />
      case "processing":
        return <Package className="h-4 w-4 mr-1" />
      case "delivered":
        return <MapPin className="h-4 w-4 mr-1" />
      case "active":
        return <Calendar className="h-4 w-4 mr-1" />
      case "returned":
        return <Package className="h-4 w-4 mr-1" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4 mr-1" />
      default:
        return <Package className="h-4 w-4 mr-1" />
    }
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <>
      <Helmet>
        <title>My Orders - RentEase</title>
        <meta name="description" content="View and manage your rental orders" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="returned">Returned</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredOrders.length > 0 ? (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-2 md:mb-0">
                        <p className="text-sm text-gray-500">Order placed</p>
                        <p className="font-medium">{format(order.date, "d MMMM yyyy")}</p>
                      </div>
                      <div className="mb-2 md:mb-0">
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium">{order.id}</p>
                      </div>
                      <div className="mb-2 md:mb-0">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">₹{order.total.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeClass(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <Link to={`/orders/${order.id}`}>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <span className="mr-1">View Details</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg?height=100&width=100"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <Link to={`/products/${item.id}`} className="font-medium hover:text-primary">
                                {item.name}
                              </Link>
                              <div className="flex justify-between mt-1">
                                <div className="text-sm text-gray-500">
                                  <span>Qty: {item.quantity}</span>
                                  <span className="mx-2">•</span>
                                  <span>Rental: {item.rentalPeriod}</span>
                                </div>
                                <p className="font-medium">₹{item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.status === "active" && (
                        <div className="mt-4 pt-4 border-t flex justify-end">
                          <Button variant="outline" size="sm" className="mr-2">
                            Extend Rental
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                            Request Return
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <div className="flex justify-center mb-4">
                  <Package className="h-16 w-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-medium mb-2">No orders found</h2>
                <p className="text-gray-600 mb-8">
                  {activeTab === "all"
                    ? "You haven't placed any orders yet."
                    : `You don't have any ${activeTab} orders.`}
                </p>
                <Link to="/products">
                  <Button size="lg">Browse Products</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};


