const asyncHandler = require('express-async-handler')
const Table = require('../models/tableModel')
const Order = require('../models/orderModel')

// @desc    Get tables
// @route   GET /api/tables
// @access  Private
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find()
  res.status(200).json(tables)
})

// @desc    Get table
// @route   GET /api/tables
// @access  Private
const getTable = asyncHandler(async (req, res) => {
  const table = await Table.findOne({ _id: req.params.id })

  if (!table) {
    res.status(400)
    throw new Error('Tavolina nuk eshte gjetur')
  }

  res.status(200).json(table)
})

// @desc    Set table
// @route   POST /api/tables
// @access  Private
const setTable = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Sheno emrin e tavolines')
  }

  const table = await Table.create({
    name: req.body.name,
    // user: req.user.id,
  })

  res.status(200).json({ msg: `Tavolina ${req.body.name} u shtua`, table })
})

// @desc    Update table
// @route   PUT /api/tables/:id
// @access  Private
const openTable = asyncHandler(async (req, res) => {
  const updateTable = await Table.updateOne(
    { _id: req.params.id },
    { $set: { opened: true } }
  )

  res.status(200).json(updateTable)
})

// @desc    Update table
// @route   PUT /api/tables/:id
// @access  Private
const closeTable = asyncHandler(async (req, res) => {
  await Table.updateOne({ _id: req.params.id }, { $set: { opened: false } })

  await Order.updateMany({ table: req.params.id }, { $set: { paid: true } })

  res.status(200).json({ msg: 'table closed' })
})

// @desc    Update table
// @route   PUT /api/table/:id
// @access  Private
const updateTable = asyncHandler(async (req, res) => {
  const tableExist = await Table.findById(req.params.id)

  if (!tableExist) {
    res.status(400)
    throw new Error('Tavolina nuk eshte gjetur')
  }

  if (!req.body.name) {
    res.status(400)
    throw new Error('Emri nuk duhet te jete i zbrazet')
  }

  const table = await Table.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    },
    {
      new: true,
    }
  )

  res.status(200).json({ msg: `Emri tavolines u ndryshua`, table })
})

// @desc    Delete table
// @route   DELETE /api/table/:id
// @access  Private
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findByIdAndDelete(req.params.id)

  if (!table) {
    req.status(400)
    throw new Error('Table didnt deleted')
  }
  res.status(200).json({ msg: 'Table removed' })
})

module.exports = {
  getTables,
  getTable,
  setTable,
  openTable,
  closeTable,
  updateTable,
  deleteTable,
}
