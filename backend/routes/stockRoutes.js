const express = require('express')
const router = express.Router()
const {
  getStock,
  setStock,
  getStocks,
  deleteStock,
} = require('../controllers/stockController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getStocks).post(protect, setStock)
router.route('/:id').get(protect, getStock).delete(protect, deleteStock)

module.exports = router
