
var formularz;
var informacja;
var rezultat;

window.onload = function () {
  formularz = document.getElementById("formularz");
  informacja = document.getElementById("informacja");
  rezultat = document.getElementById("rezultat");
  formularz.addEventListener("submit", this.onSubmit);
  console.log(formularz);
};

function onSubmit(e) {
  e.preventDefault();
  const dataUrodzenia = formularz.elements.dataUrodzenia.value;
  const liczbaDoDodania = formularz.elements.liczbaDoDodania.value;
  const jednostka = document.querySelector(
    'input[name="jednostka"]:checked'
  ).value;

  let requestBody = {
    dataUrodzenia,
    liczbaDoDodania,
    jednostka,
  };


  let disableClientValidation = false;

  if(disableClientValidation){
    sendAsynchronous(requestBody, rezultat);
  }
  else{
    let poprawnaDataUrodzenia = !isNaN(Date.parse(dataUrodzenia));
    let poprawnaLiczbaDoDodania = liczbaDoDodania >= 1;
    let poprawnaJednostka = jednostka === "Dni" || jednostka === "Miesiące";
    if(poprawnaDataUrodzenia && poprawnaLiczbaDoDodania && poprawnaJednostka){
      sendAsynchronous(requestBody, rezultat);
    }
    else{
      analyzeBadResponse({
        poprawnaDataUrodzenia,
        poprawnaLiczbaDoDodania,
        poprawnaJednostka,
      });
      rezultat.innerHTML = "Niepoprawne dane";
    }
  }
}

function analyzeBadResponse({
  poprawnaDataUrodzenia,
  poprawnaLiczbaDoDodania,
  poprawnaJednostka,
}) {
  informacja.innerHTML = "";
  if (!poprawnaDataUrodzenia) {
    informacja.innerHTML += "Błędna data<br>";
  }
  if (!poprawnaLiczbaDoDodania) {
    informacja.innerHTML += "Liczba do dodania musi być dodatnia<br>";
  }
  if (!poprawnaJednostka) {
    informacja.innerHTML += "Niezrozumiała jednostka<br>";
  }
}

function sendAsynchronous(requestBody, rezultat){
  axios
    .post("http://localhost:3000/formularz", requestBody)
    .then(response => {
        rezultat.innerHTML = response.data.przyszlaData;
    })
    .catch(error => {
        console.error(error)
        analyzeBadResponse(error.response.data);
        rezultat.innerHTML = "Niepoprawne dane";
    })
}
