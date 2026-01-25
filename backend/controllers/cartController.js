const Cart = require("../models/Cart")
const Product = require("../models/Product")

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("cartItems.product")

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      })
    }

    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, qty, rentalPeriod } = req.body

    // Find the product
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: req.user._id })

    // If cart doesn't exist, create one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        cartItems: [],
      })
    }

    // Check if product already in cart
    const existItem = cart.cartItems.find((x) => x.product.toString() === productId && x.rentalPeriod === rentalPeriod)

    // Calculate price based on rental period
    const price = rentalPeriod === "monthly" ? product.monthlyPrice : product.yearlyPrice

    if (existItem) {
      // Update quantity if item exists
      existItem.qty = qty
    } else {
      // Add new item to cart
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.image,
        price,
        rentalPeriod,
        qty,
      })
    }

    await cart.save()
    res.status(201).json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id

    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    // Remove item from cart
    cart.cartItems = cart.cartItems.filter((item) => item._id.toString() !== cartItemId)

    await cart.save()
    res.json(cart)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    cart.cartItems = []
    await cart.save()

    res.json({ message: "Cart cleared" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
}
