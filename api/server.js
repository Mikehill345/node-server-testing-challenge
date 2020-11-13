const express = require("express");

const Cars = require("../cars/carsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/cars", (req, res) => {
  Cars.getAll()
    .then(Cars => {
      res.status(200).json(Cars);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;