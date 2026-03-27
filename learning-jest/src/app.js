const express = require('express')
const validationRules = require("./middlewares/validation.middleware")
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello world"
    })
})

app.post('/register', validationRules.registerUserValidationRules, (req, res) => {

    const { username, email, password } = req.body
    res.status(200).json({
        message: "User registered successfully"
    })
})

module.exports = app
