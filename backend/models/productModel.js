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
      required: false,
    },
    category: {
      type: String,
      required: [true, 'Select product category'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
