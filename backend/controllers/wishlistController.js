const Wishlist = require("../models/Wishlist")
const Product = require("../models/Product")

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products")

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      })
    }

    res.json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user._id })

    // If wishlist doesn't exist, create one
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      })
    }

    // Check if product already in wishlist
    const isProductInWishlist = wishlist.products.includes(productId)

    if (isProductInWishlist) {
      return res.status(400).json({ message: "Product already in wishlist" })
    }

    // Add product to wishlist
    wishlist.products.push(productId)
    await wishlist.save()

    res.status(201).json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.id

    const wishlist = await Wishlist.findOne({ user: req.user._id })

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" })
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId)

    await wishlist.save()
    res.json(wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
}
