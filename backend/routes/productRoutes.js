const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(setProduct)
router.route('/:id').get(getProduct).delete(deleteProduct).put(updateProduct)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router
