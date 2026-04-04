// database se connect karne ka code yha likhege 

const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to database successfully')
    })
}

module.exports = connectDB