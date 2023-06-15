const express = require("express");
const { generateImage } = require("./controllers/openAIController");
const app = express();

const PORT = process.env.PORT;

// PRODUCTION CODE
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.use(express.json());
app.use(express.static("build"));

app.post("/generateImage", generateImage);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
