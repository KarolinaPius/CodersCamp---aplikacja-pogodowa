const searchButton = document.querySelector("#submit");
const newCity = document.querySelector("#city");
const resultWeather = document.querySelector(".currentWeather");
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
      formatCurrentWeather(data);
    });
  });
};

const fillWithHourlyForecast = () => {
  const city = newCity.value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(data => {
      formatHourlyForecast(data);
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

function formatCurrentWeather(data) {
  document.querySelector(".cityName").textContent = data.name;
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

const formatHourlyForecast = data => {
  const hourlyForecastEl = document.querySelector(".hourlyForecast");
  const hourlyForecastList = document.createElement("ul");
  hourlyForecastList.style.display = "flex";
  hourlyForecastList.style.flexWrap = "wrap";
  hourlyForecastList.style.justifyContent = "center";

  for (let i = 0; i < 5; i++) {
    let tempDiv = document.createElement("div");
    let timeDiv = document.createElement("div");
    tempDiv.style.width = "40%";
    timeDiv.style.width = "40%";
    tempDiv.textContent = `${Math.round(data.list[i].main.temp)}°C`;
    timeDiv.textContent = data.list[i].dt_txt.slice(10);
    hourlyForecastList.appendChild(tempDiv);
    hourlyForecastList.appendChild(timeDiv);
  }
  hourlyForecastEl.replaceChild(
    hourlyForecastList,
    document.querySelector(".hourlyForecastList")
  );
};

searchButton.addEventListener("click", fillWithCurrentWeatherSearchResult);
searchButton.addEventListener("click", fillWithHourlyForecast);

document.getElementById("city").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});
