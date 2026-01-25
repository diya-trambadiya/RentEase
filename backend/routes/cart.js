const express = require("express")
const router = express.Router()
const { getCart, addToCart, removeFromCart, clearCart } = require("../controllers/cartController")
const { protect } = require("../middleware/authMiddleware")

// All routes are protected
router.route("/").get(protect, getCart).post(protect, addToCart).delete(protect, clearCart)

router.route("/:id").delete(protect, removeFromCart)

module.exports = router
