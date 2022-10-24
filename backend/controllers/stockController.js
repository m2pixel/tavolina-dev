const asyncHandler = require('express-async-handler')
const Stock = require('../models/stockModel')
const Product = require('../models/productModel')

// @desc    Get stock
// @route   GET /api/stock/:id
// @access  Private
const getStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findOne({ _id: req.params.id }).populate(
    'product',
    'name'
  )

  res.status(200).json(stock)
})

// @desc    Get stocks
// @route   GET /api/stock
// @access  Private
const getStocks = asyncHandler(async (req, res) => {
  const stocks = await Stock.find()
    .populate('product', 'name')
    .sort({ _id: -1 })

  res.status(200).json(stocks)
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

  // find product
  const product = await Product.findOne({ _id: stock.product })

  // update product
  const updateProduct = await Product.findOneAndUpdate(
    { _id: stock.product },
    {
      $set: {
        qty: product.qty + stock.qty,
      },
    },
    { new: true }
  )

  res.status(200).json({ msg: `Keni shtuar produktin ne stok`, stock })
})

// @desc    Update stock
// @route   PUT /api/stock/:id
// @access  Private
const updateStock = asyncHandler(async (req, res) => {
  // const stockExist = await Stock.findById(req.params.id)
  // if (!stockExist) {
  //   res.status(400)
  //   throw new Error('Stoku nuk eshte gjetur')
  // }
  // const stock = await Stock.findOneAndUpdate(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       qty: req.body.qty,
  //       product: req.body.product,
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // )
  // // find product
  // const product = await Product.findOne({ _id: stock.product })
  // if (stockExist.qty < stock.qty) {
  //   let stockNum = stockExist.qty - stock.qty
  //   // update product
  //   const updateProduct = await Product.findOneAndUpdate(
  //     { _id: stock.product },
  //     {
  //       $set: {
  //         qty: product.qty + stockNum,
  //       },
  //     },
  //     { new: true }
  //   )
  // } else {
  //   let stockNum = stockExist.qty - stock.qty
  //   const updateProduct = await Product.findOneAndUpdate(
  //     { _id: stock.product },
  //     {
  //       $set: {
  //         qty: product.qty - stock.qty,
  //       },
  //     },
  //     { new: true }
  //   )
  // }
  // res.status(200).json({ msg: `Produkti u ndryshua`, stock })
})

// @desc    Delete stock
// @route   DELETE /api/sttock/:id
// @access  Private
const deleteStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findByIdAndDelete(req.params.id)

  if (!stock) {
    req.status(400)
    throw new Error('Stoku nuk eshte fshi')
  }

  // find product
  const product = await Product.findOne({ _id: stock.product })

  // update product
  const updateProduct = await Product.findOneAndUpdate(
    { _id: stock.product },
    {
      $set: {
        qty: product.qty - stock.qty,
      },
    },
    { new: true }
  )

  res.status(200).json({ msg: 'Stoku u fshi', id: stock._id })
})

module.exports = {
  getStock,
  getStocks,
  setStock,
  updateStock,
  deleteStock,
}
