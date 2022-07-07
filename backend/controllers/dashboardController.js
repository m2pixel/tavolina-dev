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
    .limit(10)
    .populate('table', 'name')

  res.status(200).json(orders)
})

// @desc    Get records
// @route   GET /api/dashboard/
// @access  Private
const getRecords = asyncHandler(async (req, res) => {
  const records = await Record.find({ total: { $gt: 0 } })
    .sort({ _id: -1 })
    .limit(10)

  res.status(200).json(records)
})

const countOrders = asyncHandler(async (req, res) => {
  const shift = await Shift.findOne().sort({ _id: -1 }).limit(1)
  const orders = await Order.find({ shift: shift._id })

  res.status(200).json(orders)
})

const ordersTotal = asyncHandler(async (req, res) => {
  const shift = await Shift.findOne()
    .sort({ _id: -1 })
    .limit(1)
    .populate('user', 'name')

  const orders = await Order.find({ shift: shift._id })

  let totalOrders = 0

  const getTotal = orders.map((order) => (totalOrders += order.total))
  const total = totalOrders.toFixed(2)

  res.status(200).json({ user: shift.user.name, total })
})

module.exports = {
  getOrders,
  getRecords,
  ordersTotal,
}
