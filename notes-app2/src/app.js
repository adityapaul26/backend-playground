// In this file we create the server

const express = require('express')
const noteModel = require('./models/note.model')
// creating an instance of express

const app = express()

//creating the routes

app.use(express.json())

app.post('/notes', async (req, res) => {

    const data = req.body
    await noteModel.create({
        "title": data.title,
        "description": data.description
    })

    res.status(201).json({
        "message": "Note created!"
    })
})


app.get('/notes', async (req, res) => {

    // const notes = await noteModel.find() // this find() always returns an array
    //res.send(notes)
    const notes = await noteModel.findOne({
        title: "This is the first note" //returns one object or null based on this condition
    })
    res.status(200).json({
        "message": "notes sent successfully!",
        notes: notes
    })

})

app.delete('/notes/:id', async (req, res) => {

    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        "message": "Note deleted successfully"
    })
})

app.patch('/notes/:id', async (req, res) => {

    const data = req.body
    const id = req.params.id

    await noteModel.findOneAndUpdate({ _id: id }, { description: data.description })

    res.status(200).json({
        "message": "Note updated successfully"
    })

})
//export
module.exports = app


