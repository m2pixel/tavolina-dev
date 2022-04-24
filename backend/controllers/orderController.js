const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')

// @desc    Set order
// @route   POST /api/orders
// @access  private
const setOrder = asyncHandler(async (req, res) => {
  if (!req.body.table) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const order = await Order.create({
    table: req.body.table,
    orders: req.body.orders,
    user: req.user.id,
  })

  res.status(200).json(order)
})

// @desc     Get orders
// @route   POST /api/orders/order
// @access  private
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ table: req.body.table, paid: false })

  res.status(200).json(order)
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   // Check for user email
//   const user = await User.findOne({ email })

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid credentials')
//   }
// })

// // @desc    Get user data
// // @route   GET /api/users/me
// // @access  Private
// const getMe = asyncHandler(async (req, res) => {
//   res.status(200).json(req.user)
// })

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findByIdAndDelete(req.params.id)

//   if (!user) {
//     req.stasus(400)
//     throw new Error('user didnt deleted')
//   }
//   res.status(200).json({ message: 'User removed' })
// })

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })
// }

module.exports = {
  setOrder,
  getOrders,
}
