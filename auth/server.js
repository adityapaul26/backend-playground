require('dotenv').config()
const express = require('express')
const app = require('./src/app')
const connectDB = require('./src/db/db')

// Connect to the database
connectDB()

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
