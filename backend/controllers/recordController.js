const asyncHandler = require('express-async-handler')
const Record = require('../models/recordModel')

// @desc    Get tables
// @route   GET /api/tables
// @access  Private
const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find().sort({ _id: -1 })

  res.status(200).json(records)
})

// @desc    Get table
// @route   GET /api/tables
// @access  Private
const getRecord = asyncHandler(async (req, res) => {
  const record = await Record.findOne({ _id: req.params.id })

  res.status(200).json(record)
})

// @desc    Set table
// @route   POST /api/tables
// @access  Private
const createRecord = asyncHandler(async (req, res) => {
  if (!req.body.user || !req.body.orders) {
    res.status(400)
    throw new Error('User name or orders are missing.')
  }

  const record = await Record.create({
    shift: req.body.shift,
    user: req.body.user,
    orders: req.body.orders,
  })

  res.status(200).json(record)
})

module.exports = {
  getRecord,
  getRecords,
  createRecord,
}
