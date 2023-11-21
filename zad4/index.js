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

  const Http = new XMLHttpRequest();
  const url = "http://localhost:3000/formularz";
  Http.open("POST", url);
  Http.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  Http.send(JSON.stringify(requestBody));
  Http.onload = () => {
    if (Http.status == 200) {
      rezultat.innerHTML = JSON.parse(Http.responseText).przyszlaData;
    } else if (Http.status == 400) {
      analyzeBadResponse(JSON.parse(Http.responseText));
      rezultat.innerHTML = "Niepoprawne dane";
    }
  };
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
