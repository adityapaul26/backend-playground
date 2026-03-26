const express = require('express')
const { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById } = require('../controller/music.controller')
const router = express.Router()
const multer = require('multer')
const { authArtist, authUser } = require('../middlewares/auth.middleware')


const upload = multer({
    storage: multer.memoryStorage()
})

//post requests
router.post("/create-music", authArtist, upload.single("music"), createMusic)
router.post("/create-album", authArtist, createAlbum)

//get requests
router.get("/", authUser, getAllMusic)
router.get("/albums", authUser, getAllAlbums)
router.get("/albums/:id", authUser, getAlbumById)


module.exports = router 
