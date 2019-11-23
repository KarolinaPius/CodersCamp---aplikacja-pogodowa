const searchButton = document.querySelector("#submit");
const newCity = document.querySelector("#city");
const resultWeather = document.querySelector(".currentWeather");
const resultWeatherTomorrow = document.querySelector(".tomorrowWeather");
const resultWeatherDayAfterTommorow = document.querySelector(
  ".dayAfterTomorrowWeather"
);

const APIKey = "34b55e81e4919626be452ad5a44c606a";
const today = new Date();

const fillCityName = () => {
  const cityDivs = document.querySelectorAll(".cityName");
  [...cityDivs].map(x => (x.textContent = newCity.value));
};

const fillWithCurrentWeatherSearchResult = () => {
  const city = newCity.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(data => {
      formatCurrentWeather(data);
    });
  });
};

const fillWithForecastData = () => {
  const city = newCity.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(data => {
      formatHourlyForecast(data);
      formatDailyForecast(data);
      formatNextDaysWeather(data, "tomorrows");
      formatNextDaysWeather(data, "dayAfterTomorrows");
    });
  });
};

const getCurrentDate = () => {
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return date;
};

const getCurrentTime = () => {
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
};

function formatCurrentWeather(data) {
  document.querySelector(
    "#currentDateAndTime"
  ).textContent = `${getCurrentDate()} | ${getCurrentTime()}`;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    data.main.temp
  )}°C <img src="https://openweathermap.org/img/w/${
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

const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const formatNextDaysWeather = (data, day = "tomorrows") => {
  const tempList = [];
  const windList = [];
  const pressureList = [];
  const humidityList = [];
  const cloudsList = [];
  if (day === "tomorrows") {
    for (let i = 0; i < 8; i++) {
      tempList.push(Math.round(data.list[i].main.temp));
      windList.push(data.list[i].wind.speed);
      pressureList.push(data.list[i].main.pressure);
      humidityList.push(data.list[i].main.humidity);
      cloudsList.push(data.list[i].clouds.all);
      document.querySelector(`#${day}Date`).textContent =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() + 1);
    }
  } else {
    for (let i = 8; i < 15; i++) {
      tempList.push(Math.round(data.list[i].main.temp));
      windList.push(data.list[i].wind.speed);
      pressureList.push(data.list[i].main.pressure);
      humidityList.push(data.list[i].main.humidity);
      cloudsList.push(data.list[i].clouds.all);
      document.querySelector(`#${day}Date`).textContent =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() + 2);
    }
  }

  document.querySelector(`#${day}Temp`).innerHTML = `${Math.round(
    arrAvg(tempList)
  )}°C <img src="https://openweathermap.org/img/w/${
    data.list[0].weather[0].icon
  }.png"/>`;

  document.querySelector(`#${day}Wind`).textContent = `Wiatr: ${Math.round(
    arrAvg(windList)
  )}km/h`;
  document.querySelector(
    `#${day}Pressure`
  ).textContent = `Ciśnienie: ${Math.round(arrAvg(pressureList))}hPa`;
  document.querySelector(
    `#${day}Humidity`
  ).textContent = `Wilgotność: ${Math.round(arrAvg(humidityList))}%`;
  document.querySelector(
    `#${day}Clouds`
  ).textContent = `Zachmurzenie: ${Math.round(arrAvg(cloudsList))}%`;
};

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
  hourlyForecastList.classList.add("hourlyForecastList");
  hourlyForecastEl.replaceChild(
    hourlyForecastList,
    document.querySelector(".hourlyForecastList")
  );
};

const formatDailyForecast = data => {
  const dailyForecastEl = document.querySelector(".dailyForecast");
  const dailyForecastList = document.createElement("ul");
  dailyForecastList.style.display = "flex";
  dailyForecastList.style.flexWrap = "wrap";
  dailyForecastList.style.justifyContent = "center";
  const day = new Date();
  let tempList = [];
  const dayItemsTempList = [];
  for (let i = 0; i < data.list.length; i++) {
    dayItemsTempList.push(Math.round(data.list[i].main.temp));
    if (dayItemsTempList.length % 8 === 0) {
      const average = arrAvg(dayItemsTempList);
      tempList.push(Math.round(average));
    }
  }
  for (let j = 0; j < tempList.length; j++) {
    let tempDiv = document.createElement("div");
    let dateDiv = document.createElement("div");
    tempDiv.style.width = "40%";
    dateDiv.style.width = "40%";
    tempDiv.textContent = `${tempList[j]}°C`;
    dateDiv.textContent =
      day.getFullYear() +
      "-" +
      (day.getMonth() + 1) +
      "-" +
      (day.getDate() + 1 + j);
    dailyForecastList.appendChild(tempDiv);
    dailyForecastList.appendChild(dateDiv);
  }
  dailyForecastList.classList.add("dailyForecastList");
  dailyForecastEl.replaceChild(
    dailyForecastList,
    document.querySelector(".dailyForecastList")
  );
};

searchButton.addEventListener("click", fillWithCurrentWeatherSearchResult);
searchButton.addEventListener("click", fillWithForecastData);
searchButton.addEventListener("click", fillCityName);

document.getElementById("city").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("submit").click();
  }
});
