const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const todayTemp = document.querySelector('.day-0ne');
const tomorrowTemp = document.querySelector('.day-two');
const nextDayTemp = document.querySelector('.day-three');

const API_KEY = '42b7b4b33d2f51b8a0f905e93ce13a0f';

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=6.52&lon=3.38&units=imperial&appid=${API_KEY}`;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.425&lon=-111.795&units=imperial&appid=${API_KEY}`;

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function displayWeather() {
    const weatherData = await apiFetch(url);
    displayCurrentWeather(weatherData);

    const forecastData = await apiFetch(forecastUrl);
    displayForecast(forecastData);
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

function displayForecast(data) {
    const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    todayTemp.innerHTML = `Today: ${forecastList[0].main.temp.toFixed(0)}&deg;F`;
    tomorrowTemp.innerHTML = `Tomorrow: ${forecastList[1].main.temp.toFixed(0)}&deg;F`;
    nextDayTemp.innerHTML = `Next Day: ${forecastList[2].main.temp.toFixed(0)}&deg;F`;
}

displayWeather();