const SubCategory = require('../models/subcategory.model')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Category = require('../models/category.model')
const Product = require('../models/product.model')
const fs = require('fs')
const path = require('path')
// @desc    Get all subcategories
// @route   GET /api/v1/categories/:id/subcategories
// @access  Public

exports.getSubCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  const subCategories = await SubCategory.find({ category: req.params.id })
  if (!category) {
    return next(new ErrorResponse('Category not found', 404))
  }
  res.status(200).json({ success: true, data: subCategories })
})

// @desc    Create a subcategory
// @route   POST /api/v1/categories/:id/subcategories
// @access  Public

exports.createSubcategory = [
  // Handle the file upload and set the field name to 'image'
  asyncHandler(async (req, res, next) => {
    const { name } = req.body
    const categoryId = req.params.id
    // Check if the category exists
    const existingCategory = await Category.findById(categoryId)
    if (!existingCategory) {
      return next(new ErrorResponse('Category not found', 404))
    }
    // Create the subcategory
    const subcategory = await SubCategory.create({
      name,
      category: existingCategory,
      image: '/uploads/' + req.file.filename, // Save the filename of the uploaded image to the subcategory
    })

    // Update the category with the new subcategory
    existingCategory.subCategories.push(subcategory)
    await existingCategory.save()

    return res.status(201).json({ success: true, data: subcategory })
  }),
]

// @desc    Get a subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id)
  if (!subCategory) {
    return next(new ErrorResponse('Subcategory not found', 404))
  }
  const category = await Category.findById(subCategory.category)
  subCategory.category = category
  res.status(200).json({ success: true, data: subCategory })
})

// @desc    Update a subcategory by id
// @route   PUT /api/v1/subcategories/:id
// @access  Public
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id)
  if (!subCategory) {
    return next(new ErrorResponse('Subcategory not found', 404))
  }
  const editedSubCategory = {
    name: req.body.name || subCategory.name,
  }
  if (req.file) {
    if (subCategory.image) {
      try {
        const imagePath = path.join(
          __dirname,
          '..',
          'public',
          subCategory.image
        )
        // Check if the file exists before attempting to delete it
        const fileExists = await fs.promises
          .access(imagePath, fs.constants.F_OK)
          .then(() => true)
          .catch(() => false)
        if (fileExists) {
          console.log('subcategory image exists, deleting now')
          // Delete the category image file from the server
          await fs.promises.unlink(imagePath)
        }
      } catch (error) {
        // Handle any errors during file deletion
        console.error('Error deleting subcategory image:', error)
      }
    }
  }
  editedSubCategory.image = '/uploads/' + req.file.filename
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    editedSubCategory,
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json({ success: true, data: updatedSubCategory })
})

// @desc    Delete a subcategory by id
// @route   DELETE /api/v1/subcategories/:id
// @access  Public

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id)

  if (!subCategory) {
    return next(new ErrorResponse('Subcategory not found', 404))
  }
  // Remove subcategory from parent category's subcategories array
  const category = await Category.findById(subCategory.category)
  if (category) {
    category.subCategories.pull(subCategory._id)
    await category.save()
  }
  if (subCategory.image) {
    try {
      const imagePath = path.join(__dirname, '..', 'public', subCategory.image)
      // Check if the file exists before attempting to delete it
      const fileExists = await fs.promises
        .access(imagePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
      if (fileExists) {
        console.log('subcategory image exists, deleting now')
        // Delete the category image file from the server
        await fs.promises.unlink(imagePath)
      }
    } catch (error) {
      // Handle any errors during file deletion
      console.error('Error deleting subcategory image:', error)
    }
  }
  const products = await Product.find({ subcategory: subCategory._id })
  for (const product of products) {
    const imagePath = path.join(__dirname, '..', 'public', product.image)
    // Check if the file exists before attempting to delete it
    const fileExists = await fs.promises
      .access(imagePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
    if (fileExists) {
      console.log('product image exists, deleting now')
      // Delete the category image file from the server
      await fs.promises.unlink(imagePath)
    }
  }

  await Product.deleteMany({ subCategory: subCategory._id })
  res
    .status(200)
    .json({ success: true, message: 'Subcategory deleted successfully' })
})

// @desc    Get all products of a subcategory
// @route   GET /api/v1/subcategories/:id/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id)
  if (!subCategory) {
    return next(new ErrorResponse('Subcategory not found', 404))
  }
  const products = await subCategory.getProducts()
  res.status(200).json({ success: true, data: products })
})
