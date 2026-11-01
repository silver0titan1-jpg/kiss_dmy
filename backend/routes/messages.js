const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const fichier = path.join(
  __dirname,
  "../database/messages.json"
);

router.get("/", (req, res) => {
  const messages = JSON.parse(
    fs.readFileSync(fichier)
  );

  res.json(messages);
});

router.post("/", (req, res) => {
  const messages = JSON.parse(
    fs.readFileSync(fichier)
  );

  const message = {
    id: Date.now(),
    ...req.body
  };

  messages.push(message);

  fs.writeFileSync(
    fichier,
    JSON.stringify(messages, null, 2)
  );

  res.json(message);
});

module.exports = router;