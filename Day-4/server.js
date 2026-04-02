// server.js ki responsibility — app.js ko lo, aur port pe chalaao. Sirf itna.

const app = require('./src/app')

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})