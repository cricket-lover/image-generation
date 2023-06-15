const express = require("express");
const { generateImage } = require("./controllers/openAIController");
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("build"));

app.post("/generateImage", generateImage);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
