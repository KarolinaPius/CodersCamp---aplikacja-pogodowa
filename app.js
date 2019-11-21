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
                    resultWeather.innerHTML = output;
                });
        });
}

function formatResponse(data) {
    let out = `<p>Aktualna pogoda dla ${city.name}:</p><br/>
    <p>temperatura: ${list[1].main.temp}</p><br/>
    <p>wiatr: ${list[4]}</p><br/>
    <p>ciśnienie: ${list[1].main.pressure}</p><br/>
    <p>wilgotność: ${list[1].main.humidity}</p><br/>
    <p>zachmurzenie: ${list[3]}</p><br/>`;
    return out;
}