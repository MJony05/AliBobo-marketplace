const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter category name'],
  },
  imageLink: {
    type: String,
    required: [true, 'Please enter image link'],
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

module.exports = mongoose.model('Category', categorySchema)
