const express = require('express')
const router = express.Router()
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(setProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router
