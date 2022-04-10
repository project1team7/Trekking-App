const CURRENT_LOCATION = document.getElementsByClassName('weatherContentOverview')[0];
const CURRENT_TEMP = document.getElementsByClassName('weatherContentTemp')[0];
const FORECAST = document.getElementsByClassName('forecastBox')[0];

const appid = 'e43f64ee98be9268f7a7f49e34aecfdf'; //  API KEY 

// Use Fetch API to GET data from OpenWeather API
function getWeatherData(position) {
  const headers = new Headers();
  const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?${position}&cnt=7&units=imperial&APPID=${appid}`;

  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data => data.json());
}

function applyIcon(icon) {
  let selectedIcon;
  switch (icon) {
    case '01d':
      selectedIcon = "wi-day-sunny"
      break;
    case '01n':
      selectedIcon = "wi-night-clear"
      break;
    case '02d':
    case '02n':
      selectedIcon = "wi-cloudy"
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      selectedIcon = "wi-night-cloudy"
      break;
    case '09d':
    case '09n':
      selectedIcon = "wi-showers"
      break;
    case '10d':
    case '10n':
      selectedIcon = "wi-rain"
      break;
    case '11d':
    case '11n':
      selectedIcon = "wi-thunderstorm"
      break;
    case '13d':
    case '13n':
      selectedIcon = "wi-snow"
      break;
    case '50d':
    case '50n':
      selectedIcon = "wi-fog"
      break;
    default:
      selectedIcon = "wi-meteor"
  }
  return selectedIcon;
}

// Use fetched json  to get daily forecast
renderData = (location, forecast) => {
  // get city, current weather description and temp
  const currentWeather = forecast[0].weather[0];
  const widgetHeader = `<h1>${location.name}</h1><small>${currentWeather.description}</small>`;
  console.log(forecast[0].temp.day)
  CURRENT_TEMP.innerHTML = `<i class="wi ${applyIcon(currentWeather.icon)}"></i> ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees"></i>`;
  CURRENT_LOCATION.innerHTML = widgetHeader;

  // get each daily forecast
  forecast.forEach(day => {
    let date = new Date(day.dt * 1000);
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");
    console.log(day)
    dayBlock.className = 'forecast__item';
    dayBlock.innerHTML = `<div class="forecast-item__heading">${name}</div>
      <div class="forecast-item__info"><i class="wi ${applyIcon(day.weather[0].icon)}"></i> <span class="degrees">${Math.round(day.temp.day)}<i class="wi wi-degrees"></i></span></div>`;
    FORECAST.appendChild(dayBlock);
  });
}

// calling of the weather API url
// to be able to get the current browser location geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const coordinates = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    // run/render the data
    getWeatherData(coordinates).then(weatherData => {
      const city = weatherData.city;
      const dailyForecast = weatherData.list;

      renderData(city, dailyForecast);
    });
  }, e => console.log(e));
} else {
  console.log('unable to retrieve location from browser')
}
