const express = require('express')

const app = express()
app.use(express.json()) // Middleware to parse JSON bodies
const notes = []

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body) // Store the note in the array
    res.send('Note created successfully') 

})

app.get('/notes',(req,res)=>{
    res.send(notes) // Send the array of notes as a JSON response
})

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000')
})