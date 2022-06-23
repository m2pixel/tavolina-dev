const express = require('express')
const router = express.Router()
const {
  getRole,
  getRoles,
  createRole,
  deleteRole,
} = require('../controllers/roleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRoles).post(createRole)
router.route('/:id').get(getRole).delete(deleteRole)

module.exports = router
