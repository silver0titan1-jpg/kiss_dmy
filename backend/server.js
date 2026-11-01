const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(
    "/images",
    express.static(
        path.join(__dirname, "../frontend/images")
    )
);

app.use(
    "/api/images",
    require("./routes/images")
);

app.use(
    express.static(
        path.join(__dirname, "..")
    )
);

app.listen(3000, () => {
    console.log(
        "Serveur démarré sur http://localhost:3000"
    );
});
