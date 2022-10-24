const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Table = require('../models/tableModel')

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
    shift: req.body.shift,
    orders: req.body.orders,
    total: req.body.total.toFixed(2),
    message: req.body.msg,
    paid: req.body.paid,
  })

  if (order) {
    await Table.updateOne(
      { _id: order.table },
      {
        $set: {
          order: [
            order.total,
            order.orders[order.orders.length - 1].name,
            req.body.userName,
          ],
        },
      }
    )
  }

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
  const fixTotal = req.body.total.toFixed(2)
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        orders: req.body.orders,
        total: fixTotal,
        message: req.body.msg,
        paid: req.body.paid,
      },
    },
    { new: true }
  )

  console.log(req.body.orders)

  if (!req.body.orders) {
    res.status(400)
    throw new Error('Orders object not found')
  }

  if (!order) {
    res.status(400)
    throw new Error('order not found')
  } else {
    await Table.updateOne(
      { _id: order.table },
      {
        $set: {
          order: [
            order.total,
            order.orders[order.orders.length - 1].name,
            req.body.userName,
          ],
        },
      }
    )
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

// @desc    Update order
// @route   delete /api/orders/change/:id
// @access  private
const changeTable = asyncHandler(async (req, res) => {
  const table = await Table.findOne({ _id: req.body.table })
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        table: req.body.nextTable,
      },
    }
  )

  const updateNextTable = await Table.updateOne(
    { _id: req.body.nextTable },
    {
      $set: {
        opened: true,
        order: table.order,
      },
    }
  )

  const updateTable = await Table.updateOne(
    { _id: req.body.table },
    {
      $set: {
        opened: false,
        order: [],
      },
    }
  )

  if (!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  res.status(200).json({
    msg: 'Eshte ndryshuar tavolina',
    order,
    table: updateTable._id,
    nextTable: updateNextTable._id,
  })
})

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  changeTable,
}
