const { Router } = require('express')
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller.js')
const upload = require('../utils/fileUpload')
const router = Router()

router.get('/', getCategories)
router.post('/', upload.single('image'), createCategory)
router.get('/:id', getCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
