const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  permission: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Role', roleSchema)
