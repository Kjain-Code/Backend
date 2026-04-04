// server ko create krna 

const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')

const app = express()
app.use(express.json()) // json format mein data bhejne ke liye middleware use karte hain
app.use(cors()) // cross origin resource sharing ke liye middleware use karte hain, isse hum frontend se backend ko access kar sakte hain

// create new note and dave data in mongodb database (POST)
app.post('/note',async (req,res)=>{
    const {title,description}=req.body

    const note = await noteModel.create({title,description})
    
    res.status(200).json({
        message:'note created successfully',
        note
    })
})

// feth all note data from database (GET) , data aayega array ke form mein kyoki hum bhot saare notes store karenge to data array ke form mein aayega

app.get('/notes' , async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:'notes fetched successfully',
        notes
    })
})

// delete note from database (DELETE) by using id jo hum url mein bhejenge from req.params
app.delete('/note/:id', async (req, res) => {
    const id = req.params.id

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:'note deleted successfully'
    })
})

// update note from database (PATCH) by using id jo hum url mein bhejenge from req.params
app.patch('/note/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    const note = await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message:'note updated successfully',
        note
    })
})

module.exports = app