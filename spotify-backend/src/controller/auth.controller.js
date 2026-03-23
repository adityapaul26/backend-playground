const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

// register user
const registerUser = async (req, res) => {

    const { username, email, password, role = 'user' } = req.body;

    const doesUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (doesUserAlreadyExist)
        return res.status(401).json({
            "message": "User Already exists"
        })

    const hashed = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hashed,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
}


//login user

const loginUser = async (req, res) => {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            "message": "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ "message": "Invalid credentials" })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        "message": "User logged in Successfully",
        "user": {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

module.exports = { registerUser, loginUser }
