const express = require("express");

const app = express();

app.use(express.static("zadAsync2"));
app.use(express.json());

app.post("/randomNumber", (req, res) => {
  res.status(200);
  res.send({value: Math.floor(Math.random()*100)});
});

app.listen(3000);
