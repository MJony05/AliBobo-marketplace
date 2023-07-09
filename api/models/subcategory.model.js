const mongoose = require('mongoose')

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Please enter image link'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})
subcategorySchema.pre('remove', async function (next) {
  const category = await this.model('Category').findById(this.category)
  category.subcategories.pull(this._id)
  await category.save()
  next()
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema)

module.exports = Subcategory
