// app.js ki responsibility — Express setup karo, middlewares lagao, routes connect karo. Bass. Koi listen nahi.

const express = require('express')

const app = express()

app.use(express.json()) // JSON body ko parse karne ke liye middleware

const notes = [] // ek array jisme hum notes store karenge

app.post('/notes',(req,res)=>{
    console.log(req.body)   
    notes.push(req.body) // notes array mein naya note add karo
    console.log(notes) // console pe updated notes array dikhado
    res.send('Note received') 
})

app.get('/notes',(req,res)=>{
    res.send(notes) // notes array ko client ko bhejo

})
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index] // specified index pe note delete karo
    res.send('Note deleted')    
})
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index] = req.body.description // specified index pe note update karo
    res.send('Note updated')
})
module.exports = app