const searchButton = document.querySelector("#submit");
const newCity = document.querySelector("#city");
const resultWeather = document.querySelector(".currentWeather");
const APIKey = "34b55e81e4919626be452ad5a44c606a";

const fillWithSearchResult = () => {
  const city = newCity.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(json => {
      let data = json;
      let output = formatResponse(data);
      resultWeather.appendChild(output);
    });
  });
};

const getCurrentDate = () => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return date;
};

const getCurrentTime = () => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};

function formatResponse(data) {
  let weatherDetails = document.createElement("div");
  let out = `<p>${getCurrentDate()} ${getCurrentTime()}</p>
    <p>Aktualna pogoda dla ${data.name}:</p><br/>
    <p>temperatura: ${data.main.temp}</p><br/>
    <p>wiatr: ${data.wind.speed}</p><br/>
    <p>ciśnienie: ${data.main.pressure}</p><br/>
    <p>wilgotność: ${data.main.humidity}</p><br/>
    <p>zachmurzenie: ${data.clouds.all}%</p><br/>`;
  weatherDetails.innerHTML = out;
  return weatherDetails;
}
searchButton.addEventListener("click", fillWithSearchResult);