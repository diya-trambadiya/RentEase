"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import {
  ChevronRight,
  CreditCard,
  Truck,
  Calendar,
  Shield,
  Plus,
  Home,
  Briefcase,
  Check,
  AlertCircle,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Textarea } from "../components/ui/textarea"
import { useToast } from "../components/ui/use-toast"
import { useCart } from "../context/cart-context"
import { useAuth } from "../context/auth-context"
import { format, addDays } from "date-fns"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { cart, clearCart } = useCart()
  const { user, addAddress } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [deliveryDate, setDeliveryDate] = useState(addDays(new Date(), 2)) // Default to 2 days from now
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("morning")
  const [availableCities, setAvailableCities] = useState([
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
  ])
  const [deliveryTimeSlots, setDeliveryTimeSlots] = useState([
    { id: "morning", label: "Morning (9 AM - 12 PM)" },
    { id: "afternoon", label: "Afternoon (12 PM - 3 PM)" },
    { id: "evening", label: "Evening (3 PM - 6 PM)" },
    { id: "night", label: "Night (6 PM - 9 PM)" },
  ])

  // Form state
  const [formData, setFormData] = useState({
    // Personal details
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",

    // New address
    addressType: "home",
    address: "",
    city: "",
    pincode: "",
    state: "",
    saveAddress: true,

    // Payment
    paymentMethod: "cod",

    // Additional
    additionalNotes: "",
    idType: "aadhar",
    idNumber: "",

    // Terms
    agreeTerms: false,
  })

  useEffect(() => {
    // If user is logged in, pre-fill the form with user data
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))

      // Set default address if available
      const defaultAddress = user.addresses?.find((addr) => addr.isDefault)
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id)
      } else if (user.addresses?.length > 0) {
        setSelectedAddressId(user.addresses[0].id)
      }
    }
  }, [user])

  const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0)
  const deliveryFee = subtotal > 0 ? 49 : 0
  const securityDeposit = subtotal > 0 ? Math.min(subtotal * 0.1, 2000) : 0
  const gst = subtotal * 0.18
  const total = subtotal + deliveryFee + securityDeposit + gst

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleNextStep = () => {
    // Validate current step
    if (formStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required personal details.",
          variant: "destructive",
        })
        return
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        })
        return
      }

      // Basic phone validation
      if (formData.phone.length < 10) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        })
        return
      }
    }

    if (formStep === 2) {
      if (!selectedAddressId && !isAddingAddress) {
        toast({
          title: "Missing address",
          description: "Please select an address or add a new one.",
          variant: "destructive",
        })
        return
      }

      if (isAddingAddress) {
        if (!formData.address || !formData.city || !formData.pincode || !formData.state) {
          toast({
            title: "Missing information",
            description: "Please fill in all required address details.",
            variant: "destructive",
          })
          return
        }

        // Basic pincode validation
        if (formData.pincode.length !== 6 || isNaN(formData.pincode)) {
          toast({
            title: "Invalid pincode",
            description: "Please enter a valid 6-digit pincode.",
            variant: "destructive",
          })
          return
        }

        // Check if city is serviceable
        if (!availableCities.includes(formData.city)) {
          toast({
            title: "Service not available",
            description: `We currently don't service ${formData.city}. Please select a different city.`,
            variant: "destructive",
          })
          return
        }

        // Save address if requested
        if (formData.saveAddress && user) {
          const newAddressId = addAddress({
            type: formData.addressType,
            name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            isDefault: !user.addresses || user.addresses.length === 0,
          })
          setSelectedAddressId(newAddressId)
          setIsAddingAddress(false)
        }
      }
    }

    if (formStep === 3) {
      if (!formData.idNumber) {
        toast({
          title: "Missing information",
          description: "Please provide ID details for verification.",
          variant: "destructive",
        })
        return
      }
    }

    setFormStep(formStep + 1)
  }

  const handlePrevStep = () => {
    setFormStep(formStep - 1)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Terms and conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Get selected address
    const selectedAddress = user?.addresses?.find((addr) => addr.id === selectedAddressId) || {
      name: formData.fullName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      phone: formData.phone,
    }

    // Create order details to save
    const orderDetails = {
      orderId: `ORD${Math.floor(Math.random() * 1000000)}`,
      date: new Date(),
      deliveryDate: deliveryDate,
      deliveryTimeSlot: deliveryTimeSlot,
      items: cart,
      total: total,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      securityDeposit: securityDeposit,
      gst: gst,
      address: selectedAddress,
      paymentMethod: formData.paymentMethod,
      idType: formData.idType,
      idNumber: formData.idNumber,
      additionalNotes: formData.additionalNotes,
    }

    // Save order details to localStorage for the success page
    localStorage.setItem("lastOrderDetails", JSON.stringify(orderDetails))

    // In a real app, we would send this to the backend
    // For now, we'll simulate the API call
    setTimeout(() => {
      clearCart()
      setIsProcessing(false)
      navigate("/checkout-success")
    }, 2000)
  }

  const getSelectedAddress = () => {
    if (!user || !user.addresses) return null
    return user.addresses.find((addr) => addr.id === selectedAddressId)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Add some products to your cart before proceeding to checkout.</p>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Checkout - RentEase</title>
        <meta name="description" content="Complete your rental order" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center mt-4 overflow-x-auto pb-2">
            <div className={`flex items-center ${formStep >= 1 ? "text-primary" : "text-gray-400"}`}>
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">1</div>
              <span className="ml-2 whitespace-nowrap">Personal Details</span>
            </div>
            <ChevronRight className="mx-2 text-gray-400 flex-shrink-0" />
            <div className={`flex items-center ${formStep >= 2 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full ${
                  formStep >= 2 ? "bg-primary text-white" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                2
              </div>
              <span className="ml-2 whitespace-nowrap">Shipping Address</span>
            </div>
            <ChevronRight className="mx-2 text-gray-400 flex-shrink-0" />
            <div className={`flex items-center ${formStep >= 3 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full ${
                  formStep >= 3 ? "bg-primary text-white" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                3
              </div>
              <span className="ml-2 whitespace-nowrap">Verification</span>
            </div>
            <ChevronRight className="mx-2 text-gray-400 flex-shrink-0" />
            <div className={`flex items-center ${formStep >= 4 ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full ${
                  formStep >= 4 ? "bg-primary text-white" : "bg-gray-200"
                } flex items-center justify-center`}
              >
                4
              </div>
              <span className="ml-2 whitespace-nowrap">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              {/* Step 1: Personal Details */}
              {formStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        We'll use this to contact you about your rental delivery and setup
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="button" onClick={handleNextStep}>
                      Continue to Shipping
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {formStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

                  {user && user.addresses && user.addresses.length > 0 && !isAddingAddress && (
                    <div className="mb-6">
                      <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="space-y-4">
                        {user.addresses.map((address) => (
                          <div key={address.id} className="flex items-start space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={`address-${address.id}`} className="flex items-center">
                                <div
                                  className={`p-1.5 rounded-full ${
                                    address.type === "home" ? "bg-blue-100" : "bg-green-100"
                                  } mr-2`}
                                >
                                  {address.type === "home" ? (
                                    <Home
                                      className={`h-3.5 w-3.5 ${
                                        address.type === "home" ? "text-blue-600" : "text-green-600"
                                      }`}
                                    />
                                  ) : (
                                    <Briefcase
                                      className={`h-3.5 w-3.5 ${
                                        address.type === "home" ? "text-blue-600" : "text-green-600"
                                      }`}
                                    />
                                  )}
                                </div>
                                <span className="font-medium">{address.name}</span>
                                {address.isDefault && (
                                  <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </Label>
                              <div className="mt-1 ml-7 text-sm text-gray-600">
                                <p>{address.address}</p>
                                <p>
                                  {address.city}, {address.state} - {address.pincode}
                                </p>
                                <p>Phone: {address.phone}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>

                      <Button type="button" variant="outline" className="mt-4" onClick={() => setIsAddingAddress(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </div>
                  )}

                  {(isAddingAddress || !user || !user.addresses || user.addresses.length === 0) && (
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="home"
                            name="addressType"
                            value="home"
                            checked={formData.addressType === "home"}
                            onChange={handleInputChange}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="home" className="flex items-center">
                            <Home className="h-4 w-4 mr-2" />
                            Home
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="work"
                            name="addressType"
                            value="work"
                            checked={formData.addressType === "work"}
                            onChange={handleInputChange}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="work" className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2" />
                            Work
                          </Label>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your full address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                            required
                          >
                            <option value="">Select City</option>
                            {availableCities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          <p className="text-xs text-gray-500 mt-1">We currently service only selected cities</p>
                        </div>
                        <div>
                          <Label htmlFor="pincode">
                            Pincode <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="Enter your pincode"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="state">
                          State <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter your state"
                          required
                        />
                      </div>

                      {user && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="saveAddress"
                            name="saveAddress"
                            checked={formData.saveAddress}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="saveAddress">Save this address for future orders</Label>
                        </div>
                      )}

                      {user && user.addresses && user.addresses.length > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddingAddress(false)}
                          className="mt-2"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}

                  <div className="mt-6 border-t pt-6">
                    <h3 className="font-medium mb-3">Delivery Date & Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                        <select
                          id="deliveryDate"
                          value={deliveryDate.toISOString()}
                          onChange={(e) => setDeliveryDate(new Date(e.target.value))}
                          className="w-full border rounded-md px-3 py-2 mt-1"
                        >
                          {[...Array(7)].map((_, i) => {
                            const date = addDays(new Date(), i + 1)
                            return (
                              <option key={i} value={date.toISOString()}>
                                {format(date, "EEEE, MMMM d, yyyy")}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="deliveryTimeSlot">Preferred Time Slot</Label>
                        <select
                          id="deliveryTimeSlot"
                          value={deliveryTimeSlot}
                          onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 mt-1"
                        >
                          {deliveryTimeSlots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={handleNextStep}>
                      Continue to Verification
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Verification */}
              {formStep === 3 && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">Verification</h2>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
                    <p className="text-sm text-yellow-800 flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      For security purposes, we require a valid ID proof for rental verification. This helps us maintain
                      the quality of our service and protect our inventory. Your information is securely stored and used
                      only for verification.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="idType">
                        ID Type <span className="text-red-500">*</span>
                      </Label>
                      <select
                        id="idType"
                        name="idType"
                        value={formData.idType}
                        onChange={handleInputChange}
                        className="w-full border rounded-md px-3 py-2"
                        required
                      >
                        <option value="aadhar">Aadhar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="driving">Driving License</option>
                        <option value="voter">Voter ID</option>
                        <option value="passport">Passport</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="idNumber">
                        ID Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your ID number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                      <Textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for delivery or setup"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={handleNextStep}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {formStep === 4 && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <RadioGroup
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        Pay on Delivery (Cash/UPI)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center">
                        <img src="/images/upi-icon.png" alt="UPI" width={20} height={20} className="mr-2" />
                        UPI
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-700">
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="max-h-80 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.startDate}`} className="flex py-3 border-b">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg?height=100&width=100"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        {format(new Date(item.startDate), "MMM d")} - {format(new Date(item.endDate), "MMM d, yyyy")}
                      </p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-medium">₹{item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-600">Security Deposit</span>
                    <div className="relative group ml-1">
                      <AlertCircle className="h-4 w-4 text-gray-400" />
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-48 bg-black text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-semibold mb-3">Rental Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Flexible Rental Period</p>
                    <p className="text-gray-600">You can extend your rental period anytime through your account.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Free Delivery & Setup</p>
                    <p className="text-gray-600">We'll deliver and set up your items at no extra cost.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Damage Protection</p>
                    <p className="text-gray-600">
                      Minor wear and tear is covered. No need to worry about small scratches.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {formStep === 4 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-semibold mb-3">Order Review</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500">Personal Details</p>
                    <p className="font-medium">{formData.fullName}</p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Address</p>
                    {selectedAddressId && user?.addresses ? (
                      <div>
                        {(() => {
                          const addr = user.addresses.find((a) => a.id === selectedAddressId)
                          return addr ? (
                            <>
                              <p className="font-medium">{addr.name}</p>
                              <p>{addr.address}</p>
                              <p>
                                {addr.city}, {addr.state} - {addr.pincode}
                              </p>
                              <p>Phone: {addr.phone}</p>
                            </>
                          ) : null
                        })()}
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">{formData.fullName}</p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} - {formData.pincode}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500">Delivery Date & Time</p>
                    <p className="font-medium">{format(deliveryDate, "EEEE, MMMM d, yyyy")}</p>
                    <p>{deliveryTimeSlots.find((slot) => slot.id === deliveryTimeSlot)?.label}</p>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <p>All details verified and ready for checkout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
