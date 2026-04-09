// yha pe hum authentication se related routes banayenge mtlb api bnayege jisse hum user register kr sake, login kr sake, logout kr sake, password reset kr sake etc.

const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


const authRouter = express.Router()
// agr hume app.js ke alva khi api create karni hai to hume express.Router() ka use krna hota hai

authRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body
    // yha pe hum user se name, email aur password lenge

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
        return res.status(409).json({
            message : "user already exist with this email"
        })
    }
// sabse phale check karega ki same mail wala user already exist to nhi karta , agr larta hai to 409 status code ke sath error message bhej dega
    
    const user = await userModel.create({
        name,email,password
    })
// agr nhi karta to user create hoyega 

    const token = jwt.sign({
        userId : user._id,
    }
    ,process.env.JWT_SECRET,)
// uske baad hum ek token generate karenge jisme userId hoga aur secret key hogi jo ki .env file me store hai aur set kar denge token ko cookie me jisse ki user ko baar baar login na karna pade
// kyoki user jitne baar bhi request karega to uske sath token bhi bhej dega jisse ki server ko pata chal jayega ki ye request kis user se aayi hai

res.cookie("token", token)


    res.status(201).json({
        message : "user registered successfully", 
        user,
        token
    })
// agr user successfully register ho jata hai to 201 status code ke sath success message, user data aur token bhej dega

})


// /api/auth/login

authRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body

    // agr ye email aur password nhi hai to error bhej dega
    // agr shi hai to unko token generate karke dega

    const user  = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message : "user not found with this email"
        })
    }

    // password check karein
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(401).json({
            message : "invalid email or password"
        })
    } 

    // token generate karein
    const token = jwt.sign({
        userId : user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message : "user logged in successfully",
        user,
        token
    })
})
module.exports = authRouter