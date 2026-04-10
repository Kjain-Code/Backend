// authentication related routes or api

const express = require('express')
const authRouter = express.Router()
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    // save karne se pahle check karo ki same mail se khi user already exist to nahi karta
    const existUser = await userModel.findOne({ email })
    if (existUser) {
        return res.status(409).json({
            message: 'User already exist'
        })
    }

    // agr nhi karta to save kar do 
    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash('sha256').update(password).digest('hex') // password ko hash kar diya
    })

    // user create ho gya ab token create karene 
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    // expiresIn ka matlb hai ki token kitne time ke liye valid hoga, yaha 1h ka matlb hai 1 hour ke liye valid hoga

    // ab isko cookie me store kar do
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user:{
            name : user.name,
            email : user.email
        },
        token
    })
})

authRouter.get('/get-me', async (req,res)=>{
     const token = req.cookies.token
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     const user = await userModel.findById(decoded.id)
     res.status(200).json({
        name : user.name,
        email : user.email
     })

     // user jo request karra hai usko verify karra hai ki uske pass valid token hai ya nhi, agr valid token hai to uske id se user ko database se find karra hai aur uska name aur email return karra hai

})

authRouter.post('/login', async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message : 'User not found'
        })
    }
    const hash = crypto.createHash('sha256').update(password).digest('hex')
    if(hash !== user.password){
        return res.status(401).json({
            message : 'Invalid credentials'
        })
    }
    // agr user exist karta hai aur password bhi match karra hai to token create kar do 

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.cookie('token', token)
    res.status(200).json({
        message : 'Login successful',
        user : {
            name : user.name,
            email : user.email
        },
        token
    })
    // login karne ke baad bhi token create karra hai aur cookie me store karra hai taki user ko baar baar login na karna pade
})

module.exports = authRouter