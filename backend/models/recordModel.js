const mongoose = require('mongoose')

const recordSchema = mongoose.Schema(
  {
    shift: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Shift',
    },

    user: {
      type: String,
      required: true,
    },

    orders: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      required: true,
    },

    // opened - closed date to be added later
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Record', recordSchema)
