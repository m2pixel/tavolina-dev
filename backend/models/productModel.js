const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product must have a name'],
    },
    price: {
      type: Number,
      required: [true, 'Product must have price'],
    },
    qty: {
      type: Number,
      default: 0,
      required: false,
    },
    category: {
      type: String,
      required: [true, 'Select product category'],
    },
    unlimited: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
