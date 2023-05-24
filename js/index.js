let searchCountry = document.querySelector("#search");
let weather = document.querySelector("#weather");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function search(country) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c718a1c517684d9ba8b130020230103&q=${country}&days=3`);
    let finalres = await res.json();
    displayToday(finalres.location, finalres.current, finalres.forecast.forecastday[0]);
    displayNextDay(finalres.forecast.forecastday);
}

searchCountry.addEventListener("keyup", function (eventinfo) {
    search(eventinfo.target.value);
})

function displayToday(location, current, forecast) {
    if (current != null) {
        let time = new Date(current.last_updated);
        let content = ` <div class="col-lg-4">
            <div class="weather today">
                <div class="header d-flex justify-content-between">
                    <span class="day">${days[time.getDay()]}</span>
                    <span class="date"> ${time.getDate() + months[time.getMonth()]}</span>
                </div>
                <div class="content text-start p-3">
                    <div class="location fs-5">${location.name}</div>
                    <div class="degree">
                        <div class="num  display-1 fw-bold text-white my-3">${current.temp_c}<sup>o</sup>C </div>
                        <div class="weather-icon">
                            <img src="https:${current.condition.icon}" alt="logo" width="90">
                        </div>
                    </div>
                    <div class="weather-desc">
                      ${current.condition.text} </div>
                    <div class="weather-footer">
                        <span class="umberella"><img src="image/icon-umberella.png" alt="icon">${forecast.day.daily_chance_of_rain}%</span>
                        <span class="wind"><img src="image/icon-wind.png" alt="icon">${current.wind_kph}km/h</span>
                        <span class="compass"><img src="image/icon-compass.png" alt="icon">${current.wind_dir}</span>
                    </div>
                </div>
            </div>    `;
        weather.innerHTML = content;
    }
}

function displayNextDay(nextdays) {
    let nextContent = ``;
    for (let i = 1; i < nextdays.length; i++) {
        nextContent += `<div class="col-lg-4">
        <div class="weather">
            <div class="header">
                <span class="day">${days[new Date(nextdays[i].date).getDay()]}</span>
            </div>
            <div class="content text-center p-3">
                <div class="weather-icon">
                    <img src="https:${nextdays[i].day.condition.icon}" alt="logo" width="50">
                </div>
                <div class="degree my-3">
                    <div class="maxNum fs-3 fw-bold text-white">${nextdays[i].day.maxtemp_c}<sup>o</sup>C </div>
                    <div class="minNum">${nextdays[i].day.mintemp_c}<sup>o</sup> </div>
                </div>
                <div class="weather-desc">${nextdays[i].day.condition.text} </div>
            </div>
        </div>
    </div>`
    }
    weather.innerHTML += nextContent;
}

search("new york")
