const jwt = require('jsonwebtoken')
const musicModel = require('../models/music.model')
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
    } catch (err) {
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }

    // now if they are eligible to upload
    const { title } = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        "message": "Music created successfully",
        music: {
            id: music._id,
            title: music.title
        }
    })
}

module.exports = { createMusic }
