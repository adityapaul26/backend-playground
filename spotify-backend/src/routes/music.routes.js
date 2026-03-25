const express = require('express')
const { createMusic, createAlbum } = require('../controller/music.controller')
const router = express.Router()
const multer = require('multer')

const { authArtist } = require('../middlewares/auth.middleware')


const upload = multer({
    storage: multer.memoryStorage()
})


router.post("/create-music", authArtist, upload.single("music"), createMusic)
router.post("/create-album", authArtist, createAlbum)

module.exports = router 
