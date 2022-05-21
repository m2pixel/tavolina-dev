const Shift = require('../models/shiftModel')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Record = require('../models/recordModel')
const asyncHandler = require('express-async-handler')

const createShift = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    res.status(400)
    throw new Error('User not found')
  }

  const shift = await Shift.create({
    user: req.body.id,
  })

  res.status(200).json({ msg: 'Shift created!' })
})

const getShifts = asyncHandler(async (req, res) => {
  const shifts = await Shift.find().sort({ _id: -1 })

  if (!shifts) {
    res.status(400)
    throw new Error('There is no shift.')
  }

  res.status(200).json(shifts)
})

const getShift = asyncHandler(async (req, res) => {
  const shift = await Shift.findOne({ user: req.params.id, closed: false })

  if (!shift) {
    res.status(400)
    throw new Error('You have no shift')
  }

  res.status(200).json(shift)
})

const pushOrder = asyncHandler(async (req, res) => {
  const shift = await Shift.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { orders: req.body.order } },
    { new: true }
  )

  if (!shift) {
    res.status(400)
    throw new Error('You have no shift')
  } else if (!req.body.order) {
    res.status(400)
    throw new Error('Order missed')
  }

  res.status(200).json({ msg: 'Order added to shift' })
})

const closeShift = asyncHandler(async (req, res) => {
  let shiftOrders = []
  const countOrders = await Order.find({ paid: false }).count()

  if (countOrders > 0) {
    res.status(400)
    throw new Error('Close all tables')
  }

  // addOrders method pushes orders to shiftOrders
  const addOrders = (orders) => {
    orders.map((o) => {
      shiftOrders.push({ name: o.name, price: o.price })
    })
    // console.log('orders: ', orders)
  }

  const shift = await Shift.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { closed: true } },
    { new: true }
  )

  const user = await User.findOne({ _id: shift.user })
  const orders = await Order.find({ paid: true, user: user._id })

  if (!shift) {
    res.status(400)
    throw new Error('Shift not found')
  } else {
    shift.orders.map((id) => {
      orders.map((order) => {
        if (order._id == id) {
          addOrders(order.orders)
        }
      })
    })
  }

  // get total price of orders
  const getPrice = (orders) => {
    let price = 0

    orders.map((order) => (price += order.price))

    return price
  }

  const record = await Record.create({
    shift: req.params.id,
    user: user.name,
    orders: shiftOrders,
    total: getPrice(shiftOrders),
  })

  res.status(200).json(shift)
})

module.exports = {
  getShifts,
  getShift,
  createShift,
  closeShift,
  pushOrder,
}
