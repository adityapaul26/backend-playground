const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const router = express.Router()

router.post('/create', async (req, res) => {

    const token = req.cookies.token

    if (!token) {
        // to check if the user atleast has a token that is if he/she is atlease logged in
        return res.status(401).json({
            "message": "unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        console.log(user)
    } catch (err) {
        return res.status(401).json({
            "message": "Token is invalid"
        })
    }


    // console.log(req.body)
    // console.log(req.cookies)
    console.log('Post Created successfully')
    res.status(201).json({
        message: 'Post Created successfully'
    })

})

module.exports = router
