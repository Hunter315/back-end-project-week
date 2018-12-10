const express = require("express");
const middlewareConfig = require('./middleware/middlewareConfig.js');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
// Initializes the server
const server = express();
// Middleware setup
middlewareConfig(server);
// Endpoints
server.get("/", (req, res) => res.send("API UP"));

//=========GET NOTES==========
server.get('/api/notes', async (req, res) => {
    db('notes')
      .then(notes => res.status(200).json(notes))
      .catch(error => {
        res
          .status(500)
          .json({ message: 'There was an error getting the notes', error });
      });
  });

module.exports = server;

