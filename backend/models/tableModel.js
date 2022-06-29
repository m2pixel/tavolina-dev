const mongoose = require('mongoose')

const tableSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Table must have a name'],
    },
    opened: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Table', tableSchema)
