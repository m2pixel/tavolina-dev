const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findOne({ _id: decoded.id })
        .select('-password')
        .populate('role', 'permission')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const hasPermission = asyncHandler(async (req, res, next) => {
  if (!req.user.role.permission) {
    res.status(401)
    throw new Error('You have no permission')
  }

  next()
})

// const role = asyncHandler(async (req, res) => {
//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {

//     }catch(error){

//     }
//   }
// })

module.exports = { protect, hasPermission }
