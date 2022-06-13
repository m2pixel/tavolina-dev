const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

// @desc    Get category
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()

  res.status(200).json(categories)
})

// @desc    Set category
// @route   POST /api/categories
// @access  Private
const setCategory = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const category = await Category.create({
    name: req.body.name,
    user: req.user.id,
  })

  res
    .status(200)
    .json({ msg: `Kategoria '${category.name}' u regjistrua.`, category })
})

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  const prevCategory = await Category.findOne({ _id: req.params.id })
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { new: true }
  )

  const updateProductsCategory = await Product.updateMany(
    { category: prevCategory.name },
    { $set: { category: category.name } }
  )

  if (!category) {
    res.status(400)
    throw new Error('Kategoria nuk eshte gjetur')
  }

  res.status(200).json({
    msg: 'Kategoria eshte ndryshuar',
    name: category.name,
  })
})

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    res.status(400)
    throw new Error('Category not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  await category.remove()

  res
    .status(200)
    .json({ msg: `Kategoria ${category.name} u fshi.`, id: req.params.id })
})

module.exports = {
  getCategories,
  setCategory,
  updateCategory,
  deleteCategory,
}
