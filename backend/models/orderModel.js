const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Table',
    },
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Shift',
    },
    orders: {
      type: Array,
      required: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', orderSchema)
