const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/projets", require("./routes/projets"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/users", require("./routes/users"));

app.use(
  express.static(
    path.join(__dirname, "../frontend")
  )
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `Serveur démarré sur http://localhost:${PORT}`
  );
});