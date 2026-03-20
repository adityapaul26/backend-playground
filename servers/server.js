const express = require('express')

const app = express() //creating an instance of express and storing the server in app  

app.get("/", (req, res) => {
    res.send("Hello world!")
})

// any data from the frontend is sent to the backend through req and any data sent from backend to frontend
// is sent through res

app.get("/about", (req, res) => {
    res.send("About page!")
})

app.listen(3000, () => { //running the server
    console.log("Server is running on 3000")
})

