const Shift = require('../models/shiftModel')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Record = require('../models/recordModel')
const asyncHandler = require('express-async-handler')

const createShift = asyncHandler(async (req, res) => {
  const countShift = await Shift.find({ user: req.body.id, closed: false })

  if (!req.body.id) {
    res.status(400)
    throw new Error('Perdoruesi nuk eshte gjetur')
  }

  if (countShift > 0) {
    res.status(400)
    throw new Error('Kamarieri e ka ndrrimin e hapur')
  }

  const shift = await Shift.create({
    user: req.body.id,
  })

  res.status(200).json({ msg: 'Shift created!', shift })
})

const getShifts = asyncHandler(async (req, res) => {
  const shifts = await Shift.find()
    .sort({ _id: -1 })
    .populate('user', 'name')
    .limit(15)

  if (!shifts) {
    res.status(400)
    throw new Error('There is no shift.')
  }

  res.status(200).json(shifts)
})

const getShift = asyncHandler(async (req, res) => {
  const shift = await Shift.findOne({ user: req.params.id, closed: false })

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
    throw new Error('You have no shift 2')
  } else if (!req.body.order) {
    res.status(400)
    throw new Error('Order missed')
  }

  res.status(200).json({ msg: 'Order added to shift' })
})

const closeShift = asyncHandler(async (req, res) => {
  let shiftOrders = []
  const countOrders = await Order.find({
    user: req.body.user,
    paid: false,
  }).count()

  // close all tables before closing shift
  if (countOrders > 0) {
    res.status(400)
    throw new Error('Mbyll te gjitha tavolinat')
  }

  // addOrders method pushes orders to shiftOrders
  const addOrders = (orders) => {
    return orders.orders.map((order) => {
      return shiftOrders.push({ name: order.name, price: order.price })
    })
  }

  // get total price of orders
  const getPrice = (orders) => {
    let price = 0

    orders.map((order) => (price += order.price))

    return price.toFixed(2)
  }

  const shift = await Shift.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { closed: true } },
    { new: true }
  )

  const user = await User.findOne({ _id: shift.user })

  const orders = await Order.find(
    { shift: shift._id, paid: true },
    { orders: 1 }
  )

  if (!shift) {
    res.status(400)
    throw new Error('Shift not found')
  } else {
    orders.map((order) => addOrders(order))
  }

  const record = await Record.create({
    shift: req.params.id,
    user: user.name,
    orders: shiftOrders,
    total: getPrice(shiftOrders),
  })
  res.status(200).json({ msg: 'Ndrrimi u mbyll', shift })
})

module.exports = {
  getShifts,
  getShift,
  createShift,
  closeShift,
  pushOrder,
}
