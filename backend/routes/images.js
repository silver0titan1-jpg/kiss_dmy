const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    try {
        const basePath = path.join(
            __dirname,
            "../../frontend/images"
        );

        if (!fs.existsSync(basePath)) {
            return res.status(404).json({
                erreur: "Dossier images introuvable"
            });
        }

        const projets = [];
        let id = 1;

        const dossiers = fs.readdirSync(basePath);

        dossiers.forEach(piece => {

            const dossierPiece = path.join(
                basePath,
                piece
            );

            if (!fs.statSync(dossierPiece).isDirectory()) {
                return;
            }

            const fichiers = fs.readdirSync(dossierPiece);

            fichiers.forEach(fichier => {

                const extensionsValides =
                    /\.(jpg|jpeg|png|webp|gif)$/i;

                if (!extensionsValides.test(fichier)) {
                    return;
                }

                projets.push({
                    id: id++,
                    titre: path.parse(fichier).name,
                    piece: piece,
                    src: `/images/${piece}/${fichier}`
                });

            });

        });

        res.json(projets);

    } catch (erreur) {

        console.error(
            "Erreur route /api/images :",
            erreur
        );

        res.status(500).json({
            erreur: "Erreur serveur"
        });
    }
});

module.exports = router;
