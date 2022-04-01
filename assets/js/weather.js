//geolocation API 
if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
} else {
    alert('geolocation not available?');
}

// getCurrentPosition
function getPosSuccess(pos) {
    var geoLat = pos.coords.latitude.toFixed(5);
    var geoLng = pos.coords.longitude.toFixed(5);
    var geoAcc = pos.coords.accuracy.toFixed(1);
}

// Error returned
function getPosErr(err) {
    switch (err.code) {
        case err.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case err.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case err.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
    }
}

// Weather api
function weatherBalloon(cityID) {
    var apiKey = '4abcc260a6bc7b01032a4489ed2ccdad';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=43.7&lon=-79.42' + cityID + '&appid=' + apiKey)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {
            //errors
        });
}

window.onload = function () {
    weatherBalloon(6167865);
}

function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
}