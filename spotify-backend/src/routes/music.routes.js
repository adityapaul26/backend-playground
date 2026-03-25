const express = require('express')
const { createMusic, createAlbum, getAllMusic, getAllAlbums } = require('../controller/music.controller')
const router = express.Router()
const multer = require('multer')

const { authArtist } = require('../middlewares/auth.middleware')


const upload = multer({
    storage: multer.memoryStorage()
})

//post requests
router.post("/create-music", authArtist, upload.single("music"), createMusic)
router.post("/create-album", authArtist, createAlbum)

//get requests
router.get("/", getAllMusic)
router.get("/albums", getAllAlbums)


module.exports = router 
