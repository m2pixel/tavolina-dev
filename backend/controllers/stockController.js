const asyncHandler = require('express-async-handler')
const Stock = require('../models/stockModel')

// @desc    Get stocks
// @route   GET /api/stock
// @access  Private
const getStock = asyncHandler(async (req, res) => {
  const stock = await Stock.find().populate('product', 'name')

  res.status(200).json(stock)
})

// @desc    Set stock
// @route   POST /api/stock
// @access  Private
const setStock = asyncHandler(async (req, res) => {
  if (!req.body.qty) {
    res.status(400)
    throw new Error('Please add a qty field')
  }

  const stock = await Stock.create({
    product: req.body.product,
    qty: req.body.qty,
  })

  res.status(200).json({ msg: `Keni shtuar produktin ne stok`, stock })
})

module.exports = {
  getStock,
  setStock,
}
