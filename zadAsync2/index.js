
var formularz;
var informacja;
var rezultat;

window.onload = function () {
  rezultat = document.getElementById("rezultat");
  console.log(formularz);
};

const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve()
      }, milliseconds)
  })
}

const fetchRandomNumber = async () => {
  while(true){
    await sleep(1000);
    const response = await axios.post("http://localhost:3000/randomNumber")
    rezultat.innerHTML = response.data.value;
  }
}

fetchRandomNumber();