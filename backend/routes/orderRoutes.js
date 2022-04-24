const express = require('express')
const router = express.Router()
const { getOrders, setOrder } = require('../controllers/orderController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setOrder)
router.post('/table', getOrders)

// router.route('/:id').put(updateTable).delete(deleteTable).post(getTable)
// router.post('/table', getTable)

module.exports = router
