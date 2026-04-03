// server ko start karna aur database se connect karna


const app = require('./src/app');
const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://kritika098jain_db_user:{your own password}@cluster0.uemh6vz.mongodb.net/Day-6')
    .then(()=>{
        console.log('Connected to MongoDB');
    })
}
connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})