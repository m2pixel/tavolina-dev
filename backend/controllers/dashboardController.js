const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Record = require('../models/recordModel')
const Shift = require('../models/shiftModel')

// @desc    Get category
// @route   GET /api/dashboard/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}, { orders: 1, createdAt: 1, _id: 0 })
    .sort({ _id: -1 })
    .limit(6)
    .populate('table', 'name')

  res.status(200).json(orders)
})

// @desc    Get records
// @route   GET /api/dashboard/
// @access  Private
const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find().sort({ _id: -1 }).limit(10)

  res.status(200).json(records)
})

const countOrders = asyncHandler(async (req, res) => {
  const shift = await Shift.find().sort({ _id: -1 }).limit(1)
  const orders = await Order.find({ shift: shift._id })

  res.status(200).json(orders)
})

module.exports = {
  getOrders,
  getRecords,
}
