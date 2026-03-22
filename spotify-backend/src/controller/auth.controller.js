const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

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

module.exports = { registerUser }
