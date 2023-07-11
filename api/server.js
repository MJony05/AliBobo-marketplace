const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')
dotenv.config()

connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/categories', require('./routes/category.route.js'))
app.use('/api/v1/categories/', require('./routes/subcategory.route.js'))
app.use('/api/v1/categories/', require('./routes/product.route.js'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
