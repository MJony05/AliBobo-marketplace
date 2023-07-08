const Category = require('../models/category.model.js')
const ErrorResponse = require('../utils/ErrorResponse.js')
const asyncHandler = require('../middlewares/async.js')

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
    image: '/uploads/' + req.file.filename,
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
  await Category.findByIdAndRemove(req.params.id)
  res.status(200).json({ success: true, message: 'Deleted successfully' })
})
