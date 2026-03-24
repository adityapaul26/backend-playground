const express = require('express')
const { createMusic } = require('../controller/music.controller')
const router = express.Router()


router.post("/create-music", createMusic)

module.exports = router 
