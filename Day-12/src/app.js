const express = require('express')
const app = express()
const authRouter = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

app.use(express.json())

app.use(cookieParser()) // isse hum cookies ko read kar sakte hai 
app.use('/api/auth',authRouter)
// iska matlb hai ki authentication related jitne bhi api honge uski starting url /api/auth se hogi. for example /api/auth/register , /api/auth/login etc   




module.exports = app