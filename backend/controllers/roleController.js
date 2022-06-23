const asyncHandler = require('express-async-handler')
const Role = require('../models/roleModel')

// @desc    Get roles
// @route   GET /api/roles
// @access  Private
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find()

  res.status(200).json(roles)
})

// @desc    Get role
// @route   GET /api/roles
// @access  Private
const getRole = asyncHandler(async (req, res) => {
  const role = await Role.findOne({ _id: req.params.id })

  if (!role) {
    res.status(400)
    throw new Error('Roli nuk eshte gjetur')
  }

  res.status(200).json(role)
})

// @desc    Set role
// @route   POST /api/roles
// @access  Private
const createRole = asyncHandler(async (req, res) => {
  if (!req.body.role) {
    res.status(400)
    throw new Error('Sheno rolin e perdoruesit')
  }

  const role = await Role.create({
    role: req.body.role,
    permission: req.body.permission,
  })

  res.status(200).json({ msg: `Roli ${req.body.role} u shtua`, role })
})

// @desc    Delete role
// @route   DELETE /api/role/:id
// @access  Private
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findByIdAndDelete(req.params.id)

  if (!role) {
    req.status(400)
    throw new Error('Role didnt delete')
  }
  res.status(200).json({ msg: 'Roli u fshi me sukses' })
})

module.exports = {
  getRole,
  getRoles,
  createRole,
  deleteRole,
}
