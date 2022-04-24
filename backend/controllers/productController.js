const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const User = require('../models/userModel')

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json(products)
})

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.category) {
    res.status(400)
    throw new Error('Please enter product name,price and category.')
  }

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  })

  res.status(200).json(product)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400)
    throw new Error('Product not found')
  }

  await Product.findOneAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json({ message: `Product ${req.params.id} updated` })
})

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    req.stasus(400)
    throw new Error('Product didnt deleted')
  }
  res.status(200).json({ message: 'Product removed' })
})

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
}
