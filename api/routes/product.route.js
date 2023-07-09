const { Router } = require('express')
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller.js')
const upload = require('../utils/fileUpload')
const router = Router()

router.get('/:id/products', getProducts)
router.post('/:id/products', upload.single('image'), createProduct)

module.exports = router
