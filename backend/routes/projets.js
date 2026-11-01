const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const fichier = path.join(
  __dirname,
  "../database/projets.json"
);

router.get("/", (req, res) => {
  const projets = JSON.parse(
    fs.readFileSync(fichier)
  );

  res.json(projets);
});

router.post("/", (req, res) => {
  const projets = JSON.parse(
    fs.readFileSync(fichier)
  );

  const nouveauProjet = {
    id: Date.now(),
    ...req.body
  };

  projets.push(nouveauProjet);

  fs.writeFileSync(
    fichier,
    JSON.stringify(projets, null, 2)
  );

  res.json(nouveauProjet);
});

module.exports = router;