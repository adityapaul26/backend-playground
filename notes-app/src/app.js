const express = require("express");

// create a instance of express

const app = express();

notes = [];
app.use(express.json());
//our task is to create a notes app where the user can
// GET
// POST
// DELETE
// PATCH

app.post("/notes", (req, res) => {
  const data = req.body;
  console.log(data);
  notes.push(data);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:id", (req, res) => {
  const index = req.params.id;
  delete notes[index];
  res.status(200).json({
    message: "The note has been deleted successfully",
  });
});

app.post("/notes/:id", (req, res) => {
  const index = req.params.id;
  const desc = req.body.description;
  notes[index].description = desc;
  res.status(201).json({
    message: "The description has been updated successfully",
  });
});

module.exports = app;
