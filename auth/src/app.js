const express = require('express')
const authRoutes = require('./routes/auth.routes')
//instantiate 
const app = express()

// parse json bodies - must be before routes
app.use(express.json())

// to use register we need to -> /api/auth/register
app.use("/api/auth", authRoutes)

module.exports = app
