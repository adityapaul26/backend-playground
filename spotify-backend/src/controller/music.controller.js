const jwt = require('jsonwebtoken')
const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service')


async function createMusic(req, res) {

    // now if they are eligible to upload
    const { title } = req.body
    const file = req.file

    if (!file) {
        return res.status(400).json({
            "message": "Music file is required"
        })
    }

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        "message": "Music created successfully",
        music: {
            id: music._id,
            url: music.uri,
            title: music.title
        }
    })
}

async function createAlbum(req, res) {

    // if they are eligible to create an album

    const { title, musicIds } = req.body

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musicIds
    })

    res.status(201).json({
        "message": "Album created successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    })
}


module.exports = { createMusic, createAlbum }
