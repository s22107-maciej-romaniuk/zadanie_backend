var formularz;
var informacja;
var rezultat;
const regexEmail = new RegExp(
  "^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$"
);

window.onload = function () {
  formularz = document.getElementById("formularz");
  informacja = document.getElementById("informacja");
  rezultat = document.getElementById("rezultat");
  formularz.addEventListener("submit", this.onSubmit);
  console.log(formularz);
};

function onSubmit(e) {
  e.preventDefault();
  const emailText = formularz.elements.email.value;
  const wiek = formularz.elements.wiek.value;
  var poprawnyEmail = regexEmail.test(emailText);
  var wiekDodatni = wiek >= 20;
  informacja.innerHTML = "";
  if (poprawnyEmail) {
    informacja.innerHTML += "Email poprawny<br>";
  } else {
    informacja.innerHTML += "Błędny email<br>";
  }
  if (wiekDodatni) {
    informacja.innerHTML += "Wiek zaakceptowany<br>";
  } else {
    informacja.innerHTML += "Minimalny wiek to 20 lat<br>";
  }
  rezultat.innerHTML = "";
  rezultat.innerHTML += "Wiek: " + wiek + "<br>";
  rezultat.innerHTML += "Email: " + emailText + "<br>";
  rezultat.innerHTML +=
    "Płeć: " +
    document.querySelector('input[name="plec"]:checked').value +
    "<br>";
}
