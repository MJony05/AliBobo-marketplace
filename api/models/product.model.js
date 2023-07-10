const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name'],
  },
  image: {
    type: String,
    required: [true, 'Please enter image link'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter price'],
  },
  description: {
    type: String,
    required: [true, 'Please enter description'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
})
productSchema.pre('remove', async function (next) {
  const category = await this.model('Category').findById(this.category)
  category.products.pull(this._id)
  await category.save()
  next()
})
module.exports = mongoose.model('Product', productSchema)
