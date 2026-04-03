// server ko start karna aur database se connect karna 
require('dotenv').config() // Load environment variables from .env file
const app = require('./src/app')
const mongoose = require('mongoose')
const connectDB = require('./src/config/database')

connectDB()


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})