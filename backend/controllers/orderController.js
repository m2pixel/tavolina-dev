const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
// const Table = require('../models/tableModel')

// @desc    create order
// @route   POST /api/orders
// @access  private
const createOrder = asyncHandler(async (req, res) => {
  if (!req.body.table || !req.body.user || !req.user.id) {
    res.status(400)
    throw new Error('Ju lutem plotesoni te gjitha te dhenat.')
  }

  const order = await Order.create({
    table: req.body.table,
    user: req.user.id,
    orders: req.body.orders,
  })

  res.status(200).json(order)
})

// @desc     Get orders
// @route   GET /api/orders/:id
// @access  private
const getOrders = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ table: req.params.id, paid: false })

  if (!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  res.status(200).json(order)
})

// @desc     update order
// @route   PUT /api/orders/:id
// @access  private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { orders: req.body.orders } },
    { new: true }
  )

  if (!req.body.orders) {
    res.status(400)
    throw new Error('Orders object not found')
  }

  if (!order) {
    res.status(400)
    throw new Error('order not found')
  }

  res.status(200).json(order)
})

// @desc    Delete orders
// @route   delete /api/orders/:id
// @access  private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndRemove({ _id: req.params.id })

  if (!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  res.status(200).json('Order removed')
})

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
}
