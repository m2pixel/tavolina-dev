const mongoose = require('mongoose')

const shiftSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    orders: {
      type: Array,
      default: [],
      ref: 'Order',
    },

    closed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Shift', shiftSchema)
