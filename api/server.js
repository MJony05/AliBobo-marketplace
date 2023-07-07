const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
