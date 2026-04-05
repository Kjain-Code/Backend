// server ko create krna 

const express = require('express')
const noteModel = require('./models/note.model')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json()) // json format mein data bhejne ke liye middleware use karte hain
app.use(cors()) // cross origin resource sharing ke liye middleware use karte hain, isse hum frontend se backend ko access kar sakte hain
app.use(express.static('./public')) // static files ko serve karne ke liye middleware use karte hain, isse hum apne frontend ke static files ko serve kar sakte hain
app.use(express.static(path.join(__dirname, '../public'))) // static files ko serve karne ke liye middleware use karte hain, isse hum apne frontend ke static files ko serve kar sakte hain, isme humne path module ka use kiya hai taki hum apne frontend ke static files ko serve kar sakein, isme __dirname se hum current directory ka path le rahe hain aur uske baad ../dist se hum apne frontend ke static files ka path de rahe hain, isse hum apne frontend ke static files ko serve kar sakte hain.


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

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
// this is wild card route and it will work when no other route is matched, isse humne last mein use kiya hai kyoki agar humne isse pehle use kar diya to ye route sabhi request ko match kar lega aur koi bhi route kaam nahi karega, isliye humne isse last mein use kiya hai taki agar koi bhi route match nahi hota hai to ye route match ho jaye.


module.exports = app