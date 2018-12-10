const express = require("express");
const middlewareConfig = require("./middleware/middlewareConfig.js");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);
// Initializes the server
const server = express();
// Middleware setup
middlewareConfig(server);
// Endpoints
server.get("/", (req, res) => res.send("API UP"));

//=========GET NOTES==========
server.get("/api/notes", async (req, res) => {
  try {
    const notes = await db("notes");
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the notes", error });
  }
});

//========POST A NEW NOTE=========
server.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
    const note = req.body;
    if (!title || !content) {
      res.status(400).json({ message: 'Missing information.' });
    }
    try {
      const ids = await db('notes').insert(note);
      res.status(201).json(ids);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'There was an error adding the zoo.', error });
    }
  });

module.exports = server;