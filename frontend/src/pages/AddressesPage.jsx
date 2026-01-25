"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { MapPin, Plus, Edit, Trash, Home, Briefcase, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function AddressesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, addAddress, updateAddress, removeAddress } = useAuth()
  const [addresses, setAddresses] = useState([])
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    type: "home",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  })

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      router.push("/auth/sign-in?redirect=/addresses")
      return
    }

    // Load addresses from user data
    setAddresses(user.addresses || [])
  }, [user, router])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddAddress = () => {
    // Reset form data
    setFormData({
      type: "home",
      name: user?.name || "",
      phone: user?.phone || "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: addresses.length === 0, // Make default if it's the first address
    })
    setIsAddingAddress(true)
    setEditingAddressId(null)
  }

  const handleEditAddress = (address) => {
    setFormData({
      type: address.type || "home",
      name: address.name || user?.name || "",
      phone: address.phone || user?.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      isDefault: address.isDefault || false,
    })
    setIsAddingAddress(true)
    setEditingAddressId(address.id)
  }

  const handleDeleteAddress = (addressId) => {
    removeAddress(addressId)
    setAddresses(user.addresses || [])
    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Basic phone validation
    if (formData.phone.length < 10 || isNaN(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
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

    if (editingAddressId) {
      // Update existing address
      updateAddress(editingAddressId, formData)
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } else {
      // Add new address
      addAddress(formData)
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
    }

    // Update local addresses state
    setAddresses(user.addresses || [])
    setIsAddingAddress(false)
    setEditingAddressId(null)
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Addresses</h1>

      {isAddingAddress ? (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingAddressId ? "Edit Address" : "Add New Address"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Address Type</Label>
              <RadioGroup
                name="type"
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work" className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Work
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
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
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Enter your pincode"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingAddress(false)
                  setEditingAddressId(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingAddressId ? "Update Address" : "Save Address"}</Button>
            </div>
          </form>
        </div>
      ) : (
        <Button onClick={handleAddAddress} className="mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      )}

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-6 rounded-lg shadow relative">
              {address.isDefault && (
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Default
                </div>
              )}
              <div className="flex items-start mb-4">
                <div className={`p-2 rounded-full ${address.type === "home" ? "bg-blue-100" : "bg-green-100"} mr-3`}>
                  {address.type === "home" ? (
                    <Home className={`h-5 w-5 ${address.type === "home" ? "text-blue-600" : "text-green-600"}`} />
                  ) : (
                    <Briefcase className={`h-5 w-5 ${address.type === "home" ? "text-blue-600" : "text-green-600"}`} />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{address.name}</h3>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
              </div>

              <div className="mb-4 pl-10">
                <p className="text-gray-700">{address.address}</p>
                <p className="text-gray-700">
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>

              <div className="flex space-x-2 pl-10">
                <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeleteAddress(address.id)}
                  disabled={address.isDefault}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="flex justify-center mb-4">
            <MapPin className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-medium mb-2">No addresses found</h2>
          <p className="text-gray-600 mb-8">
            You haven't added any addresses yet. Add an address to make checkout faster.
          </p>
          <Button onClick={handleAddAddress}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        </div>
      )}
    </div>
  )
}
