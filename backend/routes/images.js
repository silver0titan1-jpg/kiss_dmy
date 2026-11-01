const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/:piece", (req, res) => {

    const piece = req.params.piece;

    const dossier = path.join(
        __dirname,
        "../../frontend/images",
        piece
    );

    if (!fs.existsSync(dossier)) {
        return res.json([]);
    }

    const fichiers = fs.readdirSync(dossier);

    const images = fichiers
        .filter(f =>
            /\.(jpg|jpeg|png|webp)$/i.test(f)
        )
        .map(f => ({
            titre: f,
            piece,
            src: `/images/${piece}/${f}`
        }));

    res.json(images);
});

module.exports = router;