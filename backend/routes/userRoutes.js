const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  getMe,
  deleteUser,
} = require('../controllers/userController')
const { protect, hasPermission } = require('../middleware/authMiddleware')

router.post('/', protect, registerUser)
router.get('/', protect, getUsers)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)

module.exports = router
