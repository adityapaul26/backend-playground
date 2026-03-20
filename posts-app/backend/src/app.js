const express = require('express')
const multer = require('multer')
const connectDB = require('./db/db')
const uploadFile = require('./services/storage.service')
const postModel = require('./models/post.model')
const cors = require('cors')

connectDB()

//instantiating express
const app = express()

const upload = multer({ storage: multer.memoryStorage() })

app.use(express.json())
// In this case we have to collect data from a form and now raw data. So our express.json() cant help   
// We need to use another middle-ware called multer

//cors
app.use(cors())

// create post api  
app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    const result = await uploadFile(req.file.buffer)

    console.log(result)

    const post = postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    res.status(201).json({
        "message": "Post created successfully"
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find()

    res.status(200).json({
        posts
    })
})

module.exports = app
