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
  const emailText = formularz.elements.email.value;
  const wiek = formularz.elements.wiek.value;
  const plec = document.querySelector('input[name="plec"]:checked').value;

  let requestBody = {
    emailText,
    wiek,
    plec,
  };

  const Http = new XMLHttpRequest();
  const url = "http://localhost:3000/formularz";
  Http.open("POST", url);
  Http.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  Http.send(JSON.stringify(requestBody));
  Http.onload = () => {
    analyzeServerResponse(JSON.parse(Http.responseText), Http.status);

    if (Http.status == 200) {
      rezultat.innerHTML = "Sukces";
    } else if (Http.status == 400) {
      rezultat.innerHTML = "Błąd";
    }
  };
}

function analyzeServerResponse({ poprawnyEmail, poprawnyWiek }) {
  informacja.innerHTML = "";
  if (poprawnyEmail) {
    informacja.innerHTML += "Email poprawny<br>";
  } else {
    informacja.innerHTML += "Błędny email<br>";
  }
  if (poprawnyWiek) {
    informacja.innerHTML += "Wiek zaakceptowany<br>";
  } else {
    informacja.innerHTML += "Minimalny wiek to 20 lat<br>";
  }
}
