const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  getMe,
  deleteUser,
  updateUser,
  userPermission,
} = require('../controllers/userController')
const { protect, hasPermission } = require('../middleware/authMiddleware')

router.route('/').post(protect, registerUser).get(protect, getUsers)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser)
router.get('/hp/:id', userPermission)

module.exports = router
