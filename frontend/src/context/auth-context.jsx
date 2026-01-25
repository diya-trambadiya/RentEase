"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  const signIn = (newUser) => {
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const addAddress = (newAddress) => {
    const addresses = user?.addresses || []

    // If this is the first address or marked as default, set it as default
    if (addresses.length === 0 || newAddress.isDefault) {
      // Set all existing addresses to non-default
      addresses.forEach((addr) => (addr.isDefault = false))
    }

    // Generate a unique ID
    const id = Date.now()

    const updatedAddresses = [...addresses, { ...newAddress, id }]
    updateUser({ addresses: updatedAddresses })

    return id
  }

  const updateAddress = (addressId, updatedAddress) => {
    const addresses = user?.addresses || []

    // If setting this address as default, update all others
    if (updatedAddress.isDefault) {
      addresses.forEach((addr) => (addr.isDefault = false))
    }

    const updatedAddresses = addresses.map((addr) => (addr.id === addressId ? { ...addr, ...updatedAddress } : addr))

    updateUser({ addresses: updatedAddresses })
  }

  const removeAddress = (addressId) => {
    const addresses = user?.addresses || []
    const updatedAddresses = addresses.filter((addr) => addr.id !== addressId)

    // If we removed the default address and there are other addresses, make the first one default
    if (addresses.find((addr) => addr.id === addressId)?.isDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true
    }

    updateUser({ addresses: updatedAddresses })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateUser,
        addAddress,
        updateAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
