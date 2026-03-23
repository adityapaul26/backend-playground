const jwt = require('jsonwebtoken')
const musicModel = require('../models/music.model')

async function createModel(req, res) {

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

    // now if they are eligible
    const { title } = req.body
    const file = req.file

}
