// yha pe hum authentication se related routes banayenge mtlb api bnayege jisse hum user register kr sake, login kr sake, logout kr sake, password reset kr sake etc.

const express = require('express')
const userModel = require('../models/user.model')

const authRouter = express.Router()
// agr hume app.js ke alva khi api create karni hai to hume express.Router() ka use krna hota hai

authRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    // yha pe hum user se name, email aur password lenge
    userModel.create({
        name,email,password
    })

    res.status(201).json({
        message : "user registered successfully", 
        users
    })
})
module.exports = authRouter