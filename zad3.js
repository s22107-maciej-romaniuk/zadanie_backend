const express = require("express");

const app = express();

const regexEmail = new RegExp(
  "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$"
);

app.use(express.static("zad3"));
app.use(express.json());

app.post("/formularz", (req, res) => {
  console.log("Got body:", req.body);

  const emailText = req.body.emailText;
  const wiek = req.body.wiek;

  //walidacja
  var poprawnyEmail = regexEmail.test(emailText);
  var poprawnyWiek = wiek >= 20;

  responseBody = {
    poprawnyEmail,
    poprawnyWiek,
  };

  if (poprawnyEmail && poprawnyWiek) {
    res.status(200);
    res.send(responseBody);
  } else {
    res.status(400);
    res.send(responseBody);
  }
});

app.listen(3000);
