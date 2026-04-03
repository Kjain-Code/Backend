// server ko start karna aur database se connect karna


const app = require('./src/app');
const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://kritika098jain_db_user:1Iu7i5VlAqTC3dgR@cluster0.uemh6vz.mongodb.net/Day-6')
    .then(()=>{
        console.log('Connected to MongoDB');
    })
}
connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})