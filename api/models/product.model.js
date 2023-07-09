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
  subCategory: {
    type: String,
    required: [true, 'Please enter sub category'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
})

module.exports = mongoose.model('Product', productSchema)
