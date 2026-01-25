const User = require("../models/User");

const jwt = require("jsonwebtoken")

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Add address to user profile
// @route   POST /api/auth/addresses
// @access  Private
const addUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      const { name, street, city, state, zipCode, phone, isDefault } = req.body

      const newAddress = {
        name,
        street,
        city,
        state,
        zipCode,
        phone,
        isDefault,
      }

      // If the new address is set as default, update all other addresses
      if (isDefault) {
        user.addresses.forEach((address) => {
          address.isDefault = false
        })
      }

      user.addresses.push(newAddress)
      await user.save()

      res.status(201).json(user.addresses)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Update user address
// @route   PUT /api/auth/addresses/:id
// @access  Private
const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const addressId = req.params.id

    if (user) {
      const address = user.addresses.id(addressId)

      if (address) {
        const { name, street, city, state, zipCode, phone, isDefault } = req.body

        // If the updated address is set as default, update all other addresses
        if (isDefault && !address.isDefault) {
          user.addresses.forEach((addr) => {
            addr.isDefault = false
          })
        }

        address.name = name || address.name
        address.street = street || address.street
        address.city = city || address.city
        address.state = state || address.state
        address.zipCode = zipCode || address.zipCode
        address.phone = phone || address.phone
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault

        await user.save()
        res.json(user.addresses)
      } else {
        res.status(404).json({ message: "Address not found" })
      }
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Delete user address
// @route   DELETE /api/auth/addresses/:id
// @access  Private
const deleteUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    const addressId = req.params.id

    if (user) {
      const address = user.addresses.id(addressId)

      if (address) {
        user.addresses.pull(addressId)
        await user.save()
        res.json({ message: "Address removed", addresses: user.addresses })
      } else {
        res.status(404).json({ message: "Address not found" })
      }
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
}
