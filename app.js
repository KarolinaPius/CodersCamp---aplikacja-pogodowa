const searchButton = document.querySelector('#submit');
const newCity = document.querySelector('#city');
const resultWeather = document.querySelector('.currentWeather');
const APIKey = "34b55e81e4919626be452ad5a44c606a"

searchButton.onclick = function () {
    const city = newCity.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`;
    fetch(url)
        .then(response => {
            response.json()
                .then(json => {
                    let data = json;
                    let output = formatResponse(data);
                    resultWeather.appendChild(output);
                });
        });
}

function formatResponse(data) {
    let weatherDetails = document.createElement('div')
    let out = `<p>Aktualna pogoda dla ${data.city.name}:</p><br/>
    <p>temperatura: ${data.list[0].main.temp}</p><br/>
    <p>wiatr: ${data.list[0].wind.speed}</p><br/>
    <p>ciśnienie: ${data.list[0].main.pressure}</p><br/>
    <p>wilgotność: ${data.list[0].main.humidity}</p><br/>
    <p>zachmurzenie: ${data.list[0].clouds.all}%</p><br/>`;
    weatherDetails.innerHTML = out
    return weatherDetails;
}