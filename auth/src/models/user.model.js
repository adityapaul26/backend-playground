const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true//all usernames should be unique
    },

    email: {
        type: String,
        unique: true//all email should be unique
    },
    password: String
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
