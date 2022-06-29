const express = require('express')
const router = express.Router()
const { getStock, setStock } = require('../controllers/stockController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getStock).post(protect, setStock)
module.exports = router
