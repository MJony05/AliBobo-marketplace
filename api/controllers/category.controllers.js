const Category = require('../models/category.model.js')
const ErrorResponse = require('../utils/ErrorResponse.js')
const asyncHandler = require('../middleware/asyncHandler.js')

// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public

exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find()
  res.status(200).json({ success: true, data: categories })
})
