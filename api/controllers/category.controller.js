const Category = require('../models/category.model.js')
const ErrorResponse = require('../utils/ErrorResponse.js')
const asyncHandler = require('../middlewares/async.js')
const SubCategory = require('../models/subcategory.model.js')
const Product = require('../models/product.model.js')
const fs = require('fs')
const path = require('path')
// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find()
  res.status(200).json({ success: true, data: categories })
})

// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Public

exports.createCategory = asyncHandler(async (req, res, next) => {
  const newCategory = await Category.create({
    name: req.body.name,
    image: 'uploads/' + req.file.filename,
  })
  res.status(201).json({ success: true, data: newCategory })
})

// @desc    Get a category by id
// @route   GET /api/v1/categories/:id
// @access  Public

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return next(new ErrorResponse('Category not found', 404))
  }
  res.status(200).json({ success: true, data: category })
})

// @desc    Update a category by id
// @route   PUT /api/v1/categories/:id
// @access  Public
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return next(new ErrorResponse('Category not found', 404))
  }
  const editedCategory = {
    name: req.body.name || category.name,
    image: req.body.image || category.image,
  }
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    editedCategory,
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({ success: true, data: updatedCategory })
})

// @desc    Delete a category by id
// @route   DELETE /api/v1/categories/:id
// @access  Public

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return next(new ErrorResponse('Category not found', 404))
  }
  if (category.image) {
    try {
      const imagePath = path.join(__dirname, '..', 'public', category.image)
      // Check if the file exists before attempting to delete it
      const fileExists = await fs.promises
        .access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
      if (fileExists) {
        console.log('category image exists, deleting now')
        // Delete the category image file from the server
        await fs.promises.unlink(imagePath)
      }
    } catch (error) {
      // Handle any errors during file deletion
      console.error('Error deleting category image:', error)
    }
  }
  const products = await Product.find({ category: req.params.id })
  // Delete the images associated with the products
  for (const product of products) {
    const imagePath = path.join(__dirname, '..', 'public', product.image)
    if (product.image) {
      // Check if the file exists before attempting to delete it
      const fileExists = await fs.promises
        .access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)

      // Delete the product image file if it exists
      if (fileExists) {
        await fs.promises.unlink(imagePath)
      }
    }
  }
  const subCategories = await SubCategory.find({ category: req.params.id })
  // Delete the images associated with the subcategories
  for (const subCategory of subCategories) {
    const imagePath = path.join(__dirname, '..', 'public', subCategory.image)
    if (subCategory.image) {
      // Check if the file exists before attempting to delete it
      const fileExists = await fs.promises
        .access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)

      // Delete the subcategory image file if it exists
      if (fileExists) {
        await fs.promises.unlink(imagePath)
      }
    }
  }

  await Category.findByIdAndRemove(req.params.id)
  await SubCategory.deleteMany({ category: req.params.id })
  await Product.deleteMany({ category: req.params.id })
  res.status(200).json({ success: true, message: 'Deleted successfully' })
})
