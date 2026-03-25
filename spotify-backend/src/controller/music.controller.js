const jwt = require('jsonwebtoken')
const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service')


async function createMusic(req, res) {

    const token = req.cookies.token

    if (!token) {
        //error
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                "message": "Forbidden to create music"
            })
        }

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
            artist: decoded.id
        })

        res.status(201).json({
            "message": "Music created successfully",
            music: {
                id: music._id,
                url: music.uri,
                title: music.title
            }
        })
    } catch (err) {

        console.log(err)

        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({
                "message": "Unauthorized"
            })
        }

        return res.status(err.status || 500).json({
            "message": err.message || "Internal Server Error"
        })
    }
}

async function createAlbum(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== 'artist') {
            return res.status(403).json({
                "message": "You are not allowed to perform this action"
            })
        }

        // if they are eligible to create an album

        const { title, musicIds } = req.body

        const album = await albumModel.create({
            title,
            artist: decoded.id,
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
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            "message": "Unauthorized-error"
        })
    }
}


module.exports = { createMusic, createAlbum }
