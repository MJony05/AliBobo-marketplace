const Product = require('../models/product.model')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Category = require('../models/category.model')
const SubCategory = require('../models/subcategory.model')
const fs = require('fs')
const path = require('path')
// @desc    Get all products
// but some products have no subcategory
// @route   GET /api/v1/categories/:id/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
  if (!category) {
    return next(new ErrorResponse('Category not found', 404))
  }
  const products = await Product.find({ category: req.params.id })
  if (products.length === 0) {
    return next(new ErrorResponse('Products not found', 404))
  }
  res.status(200).json({ success: true, data: products })
})

// @desc    Create a product
// @route   POST /api/v1/categories/:id/products
// @access  Public

exports.createProduct = [
  // Handle the file upload and set the field name to 'image'
  asyncHandler(async (req, res, next) => {
    const { name, price, description } = req.body
    const categoryId = req.params.id
    let subcategory = ''
    if (req.body.subcategory) {
      subcategory = await SubCategory.findOne({
        name: req.body.subcategory,
      })
    }
    const category = await Category.findById({ _id: categoryId })
    // Check if the subcategory exists
    if (!category) {
      return next(new ErrorResponse('Category not found', 404))
    }
    const product = await Product.create({
      name,
      price,
      description,
      image: '/uploads/' + req.file.filename, // Save the filename of the uploaded image to the product
      category: categoryId,
      subcategory: subcategory?.id,
    })
    category.products.push(product)
    await category.save()
    // checking if the subcategory exists
    if (subcategory) {
      subcategory.products.push(product)
      await subcategory.save()
    }
    return res.status(201).json({ success: true, data: product })
  }),
]

// @desc    Get a product by id
// @route   GET /api/v1/products/:id
// @access  Public

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorResponse('Product not found', 404))
  }
  const category = await Category.findById(product.category)
  product.category = category
  if (product.subcategory) {
    const subcategory = await SubCategory.findById(
      product.subcategory
    ).populate('category')
    product.subcategory = subcategory
  }
  res.status(200).json({ success: true, data: product })
})

// @desc    Update a product by id
// @route   PUT /api/v1/products/:id
// @access  Public

exports.updateProduct = [
  // Handle the file upload and set the field name to 'image'
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return next(new ErrorResponse('Product not found', 404))
    }
    const editedProduct = {
      name: req.body.name || product.name,
      price: req.body.price || product.price,
      description: req.body.description || product.description,
      category: product.category,
      subcategory: product.subcategory,
    }
    // check if the image is uploaded and set the image field of editedProduct
    if (req.file) {
      editedProduct.image = '/uploads/' + req.file.filename
      // delete the old image
      fs.unlinkSync(path.join(__dirname, '../public', product.image))
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      editedProduct,
      { new: true, runValidators: true }
    )

    return res.status(201).json({ success: true, data: updatedProduct })
  }),
]

// @desc    Delete a product by id
// @route   DELETE /api/v1/products/:id
// @access  Public

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    return next(new ErrorResponse('Product not found', 404))
  }
  const category = await Category.findById(product.category)
  if (category) {
    category.products.pull(product._id)
    await category.save()
  }
  if (product.subcategory) {
    const subcategory = await SubCategory.findById(product.subcategory)
    if (subcategory) {
      subcategory.products.pull(product._id)
      await subcategory.save()
    }
  }
  if (product.image) {
    try {
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
    } catch (error) {
      // Handle any errors during file deletion
      console.error('Error deleting product image:', error)
    }
  }
  res
    .status(200)
    .json({ success: true, data: { message: 'Product deleted successfully' } })
})

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({ success: true, data: products })
})
