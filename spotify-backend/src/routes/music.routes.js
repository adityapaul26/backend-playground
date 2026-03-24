const express = require('express')
const { createMusic } = require('../controller/music.controller')
const router = express.Router()
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})


router.post("/create-music", upload.single("music"), createMusic)

module.exports = router 
