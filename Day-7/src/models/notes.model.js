const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title : {
        type :String,
        requires : true 
    },
    description : {
        type : String,
        requires : true
    }
})

const noteModel = mongoose.model('note', noteSchema)

module.exports = noteModel