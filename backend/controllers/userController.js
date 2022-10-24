const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  if (!role) {
    role = 'user'
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('Ky perdorues egziston ne databaze')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })

  if (user) {
    res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
      msg: 'Perdoruesi u regjistrua me sukses',
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

  // res.status(200).json({ msg: 'Perdoruesi u regjistrua me sukses' })
})

// @desc     Get users
// @route   GET /api/users
// @access  private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('role')

  if (!users) {
    res.status(400)
    throw new Error('Invalid request')
  }

  res.status(200).json(users)
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email }).populate('role', 'permission')

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      permission: user.role.permission,
    })
  } else {
    res.status(400)
    throw new Error('Te dhenat jane gabim.')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const getUser = asyncHandler(async (req, res) => {
  const user = await User.find({ _id: req.params.id })

  if (!user) {
    res.status(400)
    throw new Error('User not found.')
  }

  res.status(200).json(user)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    res.status(400)
    throw new Error('user didnt deleted')
  }
  res.status(200).json({ msg: 'Perdoruesi u fshi me sukses' })
})

const updateUser = asyncHandler(async (req, res) => {
  if (req.body.password !== '') {
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    )

    if (!user) {
      res.status(400)
      throw new Error('Gabim: Te dhenat nuk jane ndryshuar')
    }

    res.status(200).json({
      msg: 'Fjalekalimi eshte ndryshuar',
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
        },
      },
      { new: true }
    )

    if (!user) {
      res.status(400)
      throw new Error('Gabim: Te dhenat nuk jane ndryshuar')
    }

    res.status(200).json({
      msg: 'Te dhenat jane ndryshuar',
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    })
  }
})

// @desc    get user role
// @route   DELETE /api/users/:id
// @access  Private
const userPermission = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).populate(
    'role',
    'permission'
  )

  if (!user) {
    res.status(400)
    throw new Error('User not found')
  }

  res.status(200).json({ permission: user.role.permission, user })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  getMe,
  deleteUser,
  updateUser,
  userPermission,
}
