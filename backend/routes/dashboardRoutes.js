const express = require('express')
const router = express.Router()
const {
  getOrders,
  getRecords,
  ordersTotal,
} = require('../controllers/dashboardController')

const { protect } = require('../middleware/authMiddleware')

router.route('/orders').get(protect, getOrders)
router.get('/orders/total', ordersTotal)
router.route('/records').get(protect, getRecords)

module.exports = router
