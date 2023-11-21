const express = require("express");

const app = express();

app.use(express.static("zad4"));
app.use(express.json());

//middleware
app.use("/formularz", (req, res, next) => {
  console.log("Got body:", req.body);
  next();
});

app.post("/formularz", (req, res) => {
  const { dataUrodzenia, liczbaDoDodania, jednostka } = req.body;
  let liczbaDoDodaniaParsed = Number(liczbaDoDodania);
  let dataUrodzeniaParsed = new Date(dataUrodzenia);

  //walidacja
  let poprawnaDataUrodzenia = !isNaN(Date.parse(dataUrodzenia));
  let poprawnaLiczbaDoDodania = liczbaDoDodaniaParsed >= 1;
  let poprawnaJednostka = jednostka === "Dni" || jednostka === "Miesiące";

  //operacje
  if (poprawnaDataUrodzenia && poprawnaLiczbaDoDodania && poprawnaJednostka) {
    if (jednostka === "Dni") {
      dataUrodzeniaParsed.setDate(
        dataUrodzeniaParsed.getDate() + liczbaDoDodaniaParsed
      );
    } else {
      dataUrodzeniaParsed.setMonth(
        dataUrodzeniaParsed.getMonth() + liczbaDoDodaniaParsed
      );
    }

    let responseBody = {
      przyszlaData: dataUrodzeniaParsed.toISOString().split("T")[0],
    };

    res.status(200);
    res.send(responseBody);
  } else {
    let responseBody = {
      poprawnaDataUrodzenia,
      poprawnaLiczbaDoDodania,
      poprawnaJednostka,
    };

    res.status(400);
    res.send(responseBody);
  }
});

app.listen(3000);
