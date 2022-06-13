const express = require('express')
const router = express.Router()
const { getOrders, getRecords } = require('../controllers/dashboardController')

const { protect } = require('../middleware/authMiddleware')

router.route('/orders').get(protect, getOrders)
router.route('/records').get(protect, getRecords)

module.exports = router
