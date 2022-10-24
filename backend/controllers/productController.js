const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
// const User = require('../models/userModel')

// @desc    Get products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()

  res.status(200).json(products)
})

// @desc    Get product
// @route   GET /api/products/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })

  if (!product) {
    res.status(400)
    throw new Error('Produkti nuk eshte gjetur')
  }

  res.status(200).json(product)
})

// @desc    Set product
// @route   POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.category) {
    res.status(400)
    throw new Error('Ju lutem plotesoni te gjitha te dhenat')
  }

  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    unlimited: req.body.unlimited,
  })

  res.status(200).json({ msg: 'Produkti u shtua', product })
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const productExist = await Product.findById(req.params.id)

  if (!productExist) {
    res.status(400)
    throw new Error('Produkti nuk eshte gjetur')
  }

  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        unlimited: req.body.unlimited,
      },
    },
    {
      new: true,
    }
  )

  res.status(200).json({ msg: `Produkti u ndryshua`, product })
})

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)

  if (!product) {
    req.status(400)
    throw new Error('Product didnt deleted')
  }
  res
    .status(200)
    .json({ msg: `Produkti ${product.name} u fshi`, id: product._id })
})

module.exports = {
  getProducts,
  getProduct,
  setProduct,
  updateProduct,
  deleteProduct,
}
