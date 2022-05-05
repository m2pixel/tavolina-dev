const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController')

router.route('/').post(protect, createOrder)
router
  .route('/:id')
  .get(protect, getOrders)
  .put(protect, updateOrder)
  .delete(protect, deleteOrder)

module.exports = router
