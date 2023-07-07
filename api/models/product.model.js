const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name'],
  },
  imageLink: {
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
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
})

module.exports = mongoose.model('Product', productSchema)
