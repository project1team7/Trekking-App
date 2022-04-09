// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
let searchQuery = document.getElementById('address').value;
var apiKey = "2721e9284e13e8d9c9f8b97f5cb1de42";
var lat = '';
var lon = '';   

function getAddress() {
    // get the User's input 
    if (searchQuery === null || searchQuery === "") {
        searchQuery = 'trails';
    }
    if (searchQuery) {
        searchQuery = document.getElementById('address').value;
        trails = "+trails";
        searchQuery = searchQuery.concat(trails);
        console.log("concatenated search",searchQuery)
    }
    initMap(searchQuery);
    getCityLocation(searchQuery);
}

function getCityLocation(getCity) {
    // gets users input, either via form or button from history
    var getCityName = getCity.split("+");
    getCityName = getCityName[0];
    getCityName = getCityName.split(' ').join('+');
    console.log("This is getCity", getCityName);

    if (getCity) {
        var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + getCityName + "&limit=5&appid=" + apiKey;
        console.log("from fetch",apiUrl)
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        getCityGeoLocation(data);
                    });
                }
            })
        }
}

function getCityGeoLocation(data) {
    // get city location
    console.log("This is", data)
    var lat = data[0].lat;
    var lon = data[0].lon;

    // var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=" + apiKey;
    // console.log(apiUrl);
    initMap(lat,lon);
}

function initMapLocation() {
    const initLocation = new google.maps.LatLng(43.6426, -79.3871);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: initLocation,
        zoom: 15,
    });

}

function initMap(lat,lon) {

    const initLocation = new google.maps.LatLng(lat, lon);
    // initLocation = new google.maps.LatLng(lat,lon);

    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: initLocation,
        zoom: 15,
    });

    const request = {
        query: searchQuery,
        fields: ['name', 'location'],
    };
    console.log("Returning Request values", request)
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        console.log("Here are the first 20 trails:", results)
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log('Centering map at first trail:', results[0].formatted_address);

            for (let i = 0; i < results.length; i++) {
                // map.setCenter(results[0].location);

                // createMarker(results[i]);
                // create unordered list group
                var trailName = results[i].name;
                var trailLocation = results[i].formatted_address;

                // create a container (in the form a link) for each trail list item
                // var trailContainerEl = document.createElement("a");
                // trailContainerEl.classList = "flex flex-col w-full items-center bg-white mt-1 p-2 rounded-lg border border-slates-200 shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
                // trailContainerEl.setAttribute('id', "trail-list-item");
                // trailContainerEl.setAttribute("href", "#")
                

                // create container to stack trail name, address and other elements
                var trailItemDivEl = document.createElement('div');
                // trailItemDivEl.classList = 'flex flex-col justify-between p-1 leading-normal'; OLD
                trailItemDivEl.classList = "flex flex-col w-full items-left bg-white mt-1 p-2 rounded-lg border border-slates-200 shadow-md md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";


                // create a h5 element to hold trail name
                var trailItemNameEl = document.createElement("button");
                trailItemNameEl.classList = "mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white text-left";
                trailItemNameEl.setAttribute('id', "trail-name");
                trailItemNameEl.setAttribute("type", "button")
                trailItemNameEl.textContent = trailName;

                // create a p element to hold trail location
                var trailItemLocationEl = document.createElement("p");
                trailItemLocationEl.classList = "text-xs w-2/3 text-left font-normal text-gray-700 dark:text-gray-400";
                trailItemLocationEl.setAttribute('id', "trail-address");
                trailItemLocationEl.textContent = trailLocation;

                // add header and p element to div wrapper
                trailItemDivEl.appendChild(trailItemNameEl);
                trailItemDivEl.appendChild(trailItemLocationEl);

                // append div to trail list item container
                // trailContainerEl.appendChild(trailItemDivEl);
                // results[i] = trailContainerEl; //OLD ONE
                results[i] = trailItemDivEl;

                // append container to the dom
                let trailList = document.getElementById('trail-list');

                trailList.appendChild(trailItemDivEl);

                // trailList.appendChild(resultsItemEl);
                function createMarker(place) {
                    if (!place.geometry || !place.geometry.location) return;

                    const marker = new google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });

                    google.maps.event.addListener(marker, "click", () => {
                        infowindow.setContent(place.name || "");
                        infowindow.open(map);
                    });
                }
            }
            map.setCenter(initLocation);
        }
    });
}
// TODO: add marker at each trail location
