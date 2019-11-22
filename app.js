const searchButton = document.querySelector("#submit");
const newCity = document.querySelector("#city");
const resultWeather = document.querySelector(".currentWeather");

//nowe selektory do treści do kolejnych slajdów
const resultWeatherTomorrow = document.querySelector(".tomorrowWeather");
const resultWeatherDayAfterTommorow = document.querySelector(
  ".dayAfterTomorrowWeather"
);

const APIKey = "34b55e81e4919626be452ad5a44c606a";

const fillWithCurrentWeatherSearchResult = () => {
  const city = newCity.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(data => {
      formatResponse(data);
    });
  });
};

const fillWithForecastSearchResult = () => {
  const city = newCity.value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(json => {
      let data = json;
      let output = formatResponse2(data);
      resultWeatherTomorrow.replaceChild(output);
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
  document.querySelector("#currentCityName").textContent = data.name;
  document.querySelector(
    "#currentDateAndTime"
  ).textContent = `${getCurrentDate()} | ${getCurrentTime()}`;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    data.main.temp
  )}°C <img src="http://openweathermap.org/img/w/${
    data.weather[0].icon
  }.png"/>`;

  document.querySelector(
    "#currentWind"
  ).textContent = `Wiatr: ${data.wind.speed}km/h`;
  document.querySelector(
    "#currentPressure"
  ).textContent = `Ciśnienie: ${data.main.pressure}hPa`;
  document.querySelector(
    "#currentHumidity"
  ).textContent = `Wilgotność: ${data.main.humidity}%`;
  document.querySelector(
    "#currentClouds"
  ).textContent = `Zachmurzenie: ${data.clouds.all}%`;
}

searchButton.addEventListener("click", fillWithCurrentWeatherSearchResult);

document.getElementById("city").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});
