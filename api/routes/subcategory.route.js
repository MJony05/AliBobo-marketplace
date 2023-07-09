const { Router } = require('express')
const {
  getSubCategories,
  createSubcategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require('../controllers/subcategory.controller.js')
const upload = require('../utils/fileUpload')
const router = Router()

// in sevver.js app.use('/categories/', require('./routes/subcategory.route.js'))
router.get('/:id/subcategories/', getSubCategories)
router.post('/:id/subcategories/', upload.single('image'), createSubcategory)
router.get('/subcategories/:id', getSubCategory)
router.put('/subcategories/:id', updateSubCategory)
router.delete('/subcategories/:id', deleteSubCategory)

module.exports = router
