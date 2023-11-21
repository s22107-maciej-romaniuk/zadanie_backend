const express = require("express");
var bodyParser = require("body-parser");
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("zad2"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/zad2/strona.html");
// });

app.post("/", urlencodedParser, (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});

app.listen(3000);
