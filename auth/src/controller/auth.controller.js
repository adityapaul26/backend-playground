const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {

    const { username, email, password } = req.body;

    //check if user with same email already exist
    const doesUserAlreadyExist = await userModel.findOne({
        email
    })

    if (doesUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist"
        })
    }

    //logic
    const user = await userModel.create({
        username,
        email,
        password
    })


    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        user,
        token
    })

}

module.exports = { registerUser }
