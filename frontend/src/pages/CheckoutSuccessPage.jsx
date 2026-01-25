"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { CheckCircle, Truck, Calendar, Shield, MapPin, Clock } from "lucide-react"
import { Button } from "../components/ui/button"

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState({
    orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
    date: new Date(),
    deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    items: [],
    total: 0,
    address: {},
    paymentMethod: "cod",
  })

  useEffect(() => {
    // Retrieve order details from localStorage if available
    const savedOrderDetails = localStorage.getItem("lastOrderDetails")
    if (savedOrderDetails) {
      try {
        setOrderDetails(JSON.parse(savedOrderDetails))
      } catch (error) {
        console.error("Failed to parse order details:", error)
      }
    }
  }, [])

  // Format date to readable string
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Helmet>
        <title>Order Confirmed - RentEase</title>
        <meta name="description" content="Your rental order has been confirmed" />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-50 p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-gray-600 mb-4">
                Thank you for your order. We've received your rental request and will process it shortly.
              </p>
              <div className="inline-block bg-white px-4 py-2 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-lg">{orderDetails.orderId}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{formatDate(orderDetails.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expected Delivery</p>
                    <p className="font-medium">{formatDate(orderDetails.deliveryDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium capitalize">
                      {orderDetails.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : orderDetails.paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : orderDetails.paymentMethod === "upi"
                            ? "UPI"
                            : orderDetails.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium">
                      {orderDetails.address.name || "Your delivery address"}
                      <br />
                      {orderDetails.address.address || "123 Main St, Apartment 4B"}
                      <br />
                      {orderDetails.address.city || "Bangalore"}, {orderDetails.address.state || "Karnataka"} -{" "}
                      {orderDetails.address.pincode || "560001"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full border-l-2 border-gray-200"></div>

                  <div className="relative flex items-start mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white z-10">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">Order Confirmed</h3>
                      <p className="text-sm text-gray-500">Your order has been confirmed and is being processed</p>
                      <p className="text-xs text-gray-400">{new Date().toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 z-10">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-500">Processing</h3>
                      <p className="text-sm text-gray-500">Your order is being prepared for delivery</p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 z-10">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-500">Out for Delivery</h3>
                      <p className="text-sm text-gray-500">Your order will be delivered soon</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 z-10">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-500">Delivered</h3>
                      <p className="text-sm text-gray-500">Expected by {formatDate(orderDetails.deliveryDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
                <ol className="text-left space-y-4 text-gray-600">
                  <li className="flex">
                    <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Confirmation Call</p>
                      <p className="text-sm">
                        Our team will call you within 24 hours to confirm your order and delivery details.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Delivery & Setup</p>
                      <p className="text-sm">
                        We'll deliver and set up your rented items at your preferred location and time.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Enjoy Your Rental</p>
                      <p className="text-sm">
                        Use your rented items worry-free. We'll pick them up at the end of your rental period.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/orders">View My Orders</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-2">Need help with your order?</p>
            <p className="font-medium">
              Contact our customer support at support@rentease.com or call us at +91 9876543210
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
