const express = require("express");
var bodyParser = require("body-parser");
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/foto.html");
});

app.post("/", urlencodedParser, (req, res) => {
  console.log("Got body:", req.body);
  res.sendFile(__dirname + "/" + req.body.photo_name);
});

app.listen(3000);
