"use strict";

const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

//middlewares and these replace the body parser package. 
//most express servers that we set up have this so its good

app.use(express.urlencoded({extended: true}))
app.use(express.json()) //extra functionality in rec.body
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome! Try /random/:min/:max to get a random number.");
});

app.get("/random/:min/:max", sendRandom, cors());

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});

function sendRandom(req, res) {
  let min = parseInt(req.params.min);
  let max = parseInt(req.params.max);if (isNaN(min) || isNaN(max)) {
    res.status(400).json({ error: "Bad Request: parameters must be numbers" });
    return;
  }

  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  res.json({ result: result });
}

