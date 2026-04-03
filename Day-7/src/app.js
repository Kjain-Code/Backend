// server ko create karna aur config karna 

const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json()) // middleware to parse JSON data from request body

app.post('/notes',async (req,res)=>{
    const {title, description} = req.body
    
    const note = await noteModel.create(
        {title, description}
    )
    res.status(201).json({
        message : 'Note created successfully',
        success : true,
        data : note
    })
})

module.exports = app