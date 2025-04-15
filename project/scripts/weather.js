// DOM Selectors
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector(".weather-desc");
const day1 = document.querySelector(".day-one");
const day2 = document.querySelector(".day-two");

// Constants
const coord = { lat: 6.52, lon: 3.38 }; // Coordinates
const dayCount = 2;

const forecastURL = `https://api.weatherapi.com/v1/forecast.json?q=7.34,3.84&days=${dayCount}&key=25904d312a5a4a95ab0225050242805&hour=12`;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=b92da245303a816497b90a4eeb90ddf5&units=metric`;

// Fetch Data from APIs
async function apiFetch() {
    try {
        const currentResponse = fetch(currentURL);
        const forecastResponse = fetch(forecastURL);

        // Wait for both API responses
        const responses = await Promise.all([currentResponse, forecastResponse]);

        if (responses[0].ok && responses[1].ok) {
            const currentData = await responses[0].json();
            const forecastData = await responses[1].json();

            // Call display function to update UI
            displayResults(currentData, forecastData);
        } else {
            throw new Error("Failed to fetch data. Please check your API URLs or keys.");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function displayResults(currentData, forecastData) {
    currentTemp.innerHTML = `${Math.round(currentData.main.temp)}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    let desc = currentData.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    weatherDesc.textContent = desc;

    // Update 2-day forecast
    const forecastArray = forecastData.forecast.forecastday;
    day1.innerHTML = `Today: ${Math.round(forecastArray[0].day.avgtemp_c)}&deg;C |`;
    day2.innerHTML = `Tomorrow: ${Math.round(forecastArray[1].day.avgtemp_c)}&deg;C`;
}

// Show banner on specific days
function showBannerOnSpecificDays() {
    const currentDay = new Date().getDay();

    // Display banner only on Monday, Tuesday, or Wednesday
    if (currentDay === 1 || currentDay === 2 || currentDay === 3) {
        const banner = document.querySelector(".banner");
        if (banner) {
            banner.style.display = "flex";
        }
    }
}

// Initialize API fetch
apiFetch();
