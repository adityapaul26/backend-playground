const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB")
}

module.exports = connectDB
