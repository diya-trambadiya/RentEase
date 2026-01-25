const express = require("express")
const router = express.Router()
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderController")
const { protect } = require("../middleware/authMiddleware")

// All routes are protected
router.route("/").post(protect, createOrder)

router.route("/myorders").get(protect, getMyOrders)

router.route("/:id").get(protect, getOrderById)

router.route("/:id/pay").put(protect, updateOrderToPaid)

router.route("/:id/status").put(protect, updateOrderStatus)

module.exports = router
