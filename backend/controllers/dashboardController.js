const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Record = require('../models/recordModel')

// @desc    Get category
// @route   GET /api/dashboard/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}, { orders: 1, _id: 0 })
    .sort({ _id: -1 })
    .limit(5)

  res.status(200).json(orders)
})

// @desc    Get records
// @route   GET /api/dashboard/
// @access  Private
const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find().sort({ _id: -1 }).limit(8)

  res.status(200).json(records)
})

module.exports = {
  getOrders,
  getRecords
}
