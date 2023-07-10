const { Router } = require('express')
const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/product.controller.js')
const upload = require('../utils/fileUpload')
const router = Router()

router.get('/:id/products', getProducts)
router.post('/:id/products', upload.single('image'), createProduct)
router.get('/products/:id', getProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router
