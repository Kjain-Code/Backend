const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

// hamara data kis form mein jayega uska structure define karne ke liye schema banate hain

const noteModel = mongoose.model('notes',noteSchema)

// bina model ke aap database mein data nahi daal sakte, model banane ke baad hi aap database mein data daal sakte hain
// mtlb CRUB operations karne ke liye model ki jarurat hoti hai
// 'notes' collection ban jayegi database mein jisme noteSchema ke according data store hoga ye string islia hai kyoki hum bhot saare notes store karenge to collection ka naam plural hona chahiye aur noteSchema hamara schema hai jisme humne title aur description define kiya hai
// safe format ka data jab hum store karte hai to usko collection bolte hai 
// yha notes ka data notes collection mein store hoga aur uska structure noteSchema ke according hoga jisme title aur description honge dono string type ke aur required honge


module.exports = noteModel
