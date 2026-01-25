const express = require("express")
const router = express.Router()
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/wishlistController")
const { protect } = require("../middleware/authMiddleware")

// All routes are protected
router.route("/").get(protect, getWishlist).post(protect, addToWishlist)

router.route("/:id").delete(protect, removeFromWishlist)

module.exports = router
