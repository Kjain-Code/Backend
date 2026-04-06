// server create karna aur api banana

const express = require('express')
const authRouter = require('./routes/auth.routes')



const app = express()
app.use(express.json())

app.use('/api/auth',authRouter)
// iska mtlb hai ki jab bhi koi request aayegi /api/auth se start hogi to usko authRouter ke pass bhej do jaha pe humne register ka route banaya hai

module.exports = app