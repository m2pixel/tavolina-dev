const express = require('express')
const router = express.Router()
const {
  getShift,
  getShifts,
  createShift,
  closeShift,
  pushOrder,
} = require('../controllers/shiftController')

const { protect, hasPermission } = require('../middleware/authMiddleware')

router.route('/').get(protect, hasPermission, getShifts).post(createShift)
router.route('/:id').get(getShift).put(closeShift)
router.route('/add/:id').put(pushOrder)

module.exports = router
