const express = require('express')
const router = express.Router()
const {
  getShift,
  getShifts,
  createShift,
  closeShift,
  pushOrder,
} = require('../controllers/shiftController')

router.route('/').get(getShifts).post(createShift)
router.route('/:id').get(getShift).put(closeShift)
router.route('/add/:id').put(pushOrder)

module.exports = router
