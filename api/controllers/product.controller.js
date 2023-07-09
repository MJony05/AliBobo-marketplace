const Product = require('../models/product.model')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Category = require('../models/category.model')
const SubCategory = require('../models/subcategory.model')

// @desc    Get all products
// but some products have no subcategory
// @route   GET /api/v1/categories/:id/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ category: req.params.id })
  console.log(products)
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
      subcategory = await SubCategory.find({
        name: req.body.subcategory,
      })
    }
    const category = await Category.findOne({ name: req.body.category })
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
      subcategory: subcategory.id || null,
    })
    category.products.push(product)
    await category.save()
    if (subcategory !== '') {
      subcategory[0].products.push(product)
      await subcategory[0].save()
    }
    return res.status(201).json({ success: true, data: product })
  }),
]

// @desc    Get a product by id
// @route   GET /api/v1/products/:id
// @access  Public

// exports.getProduct = asyncHandler(async (req, res, next) => {
//   const product = await Product.findById(req.params.id)
//   if (!product) {
//     return next(new ErrorResponse('Product not found', 404))
//   }
//   const category = await Category.findById(product.category)
//   product.category = category
//   if (product.subcategory) {
//     const subcategory = await SubCategory
//       .findById(product.subcategory)
//       .populate('category')
//     product.subcategory = subcategory
//   }
