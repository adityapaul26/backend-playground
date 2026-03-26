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

async function getAllMusic(req, res) {

    const musics = await musicModel.find().populate('artist', 'username email');

    if (musics.length === 0) {
        return res.status(200).json({
            message: "No music found",
            musics: []
        });
    }

    return res.status(200).json({
        message: "Music fetched",
        musics: musics
    });
}

async function getAllAlbums(req, res) {

    // find() fetches all the song that could crash our server .. so we limit the number of songs that
    // it loads with limit()

    const albums = await albumModel
        .find()
        .skip(1)
        .limit(2)// used to implement pagination
        .select("title artist")
        .populate("artist", "username email")
        .populate("musics")

    return res.status(200).json({
        message: "All albums fetched",
        albums: albums
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.id
    const album = await albumModel
        .find({ _id: albumId })
        .populate("artist", "username email")

    return res.status(200).json({
        message: "Album fetched",
        album: album
    })

}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById }
