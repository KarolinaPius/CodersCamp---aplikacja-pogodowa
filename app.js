const searchButton = document.querySelector("#submit");
const newCity = document.querySelector("#city");
const resultWeather = document.querySelector(".currentWeather");

//nowe selektory do treści do kolejnych slajdów
const resultWeatherTomorrow = document.querySelector(".tomorrowWeather");
const resultWeatherDayAfterTommorow = document.querySelector(".dayAfterTomorrowWeather");

const APIKey = "34b55e81e4919626be452ad5a44c606a";

const fillWithSearchResult = () => {
  const city = newCity.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(json => {
      let data = json;
      let output = formatResponse(data);
      // zamieniłam metodę, żeby nowy element zastępował stary, zamiast dodawać się pod spodem
      resultWeather.replaceChild(output, document.querySelector(".weatherDetails"));
    });
  });
};

// drugie api z forecast - chciałam wstawić dane na jutro i pojutrze, poddałam się, bo nie wiem po 
// jakim selektorze łapać prognozę na poszczególne dni

const fillWithForecastSearchResult = () => {
  const city = newCity.value;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
  fetch(url).then(response => {
    response.json().then(json => {
      let data = json;
      let output = formatResponse2(data);
      resultWeatherTomorrow.replaceChild(output, );
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

// dodałam "chmurkę" i troszkę przeorganizowałam, zaokrągliłam
function formatResponse(data) {
  let weatherDetails = document.createElement("div");
  weatherDetails.className = "weatherDetails";
  let out = `
  <div class = "mainInfo">
    <p><b>Aktualna pogoda dla miasta ${data.name}:</b></p><br/>
    <p>w dniu ${getCurrentDate()}</p></br>
    <p>o godzinie ${getCurrentTime()}</p></br>
    <img src = "http://openweathermap.org/img/w/${data.weather[0].icon}.png"><br/>
  </div>
  <div class = "detailInfo">
    <p>temperatura: ${Math.round(data.main.temp)}<sup>o</sup>C</p><br/>
    <p>wiatr: ${data.wind.speed} km/h</p><br/>
    <p>ciśnienie: ${data.main.pressure} hPa</p><br/>
    <p>wilgotność: ${data.main.humidity}%</p><br/>
    <p>zachmurzenie: ${data.clouds.all}%</p><br/>
  </div>
  `;
  weatherDetails.innerHTML = out;
  return weatherDetails;
}

// zmaina stylu z poziomu JS
resultWeather.style.fontSize = "16px";
resultWeather.style.color = "darkblue";

searchButton.addEventListener("click", fillWithSearchResult);

// enter = click na buttonie
document.getElementById("city")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("submit").click();
    }
});

