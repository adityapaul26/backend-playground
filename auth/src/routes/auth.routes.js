const express = require('express')
const authController = require('../controller/auth.controller')

const router = express.Router()

router.post('/register', authController.registerUser)


// cookies can be accessed by the server and are sent with every request
// router.get('/test', (req, res) => {
//     console.log("Cookies:", req.cookies)
//     res.status(200).json({
//         cookies: req.cookies
//     })
// })

module.exports = router
