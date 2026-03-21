const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')

//instantiate 
const app = express()

// parse json bodies - must be before routes
app.use(express.json())
app.use(cookieParser())

// to use register we need to -> /api/auth/register
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)

module.exports = app
