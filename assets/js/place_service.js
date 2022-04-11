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
    if (!searchQuery) {
        searchQuery = 'trail11111';
    }
    if (searchQuery) {
        searchQuery = document.getElementById('address').value;
        trails = "+trails";
        searchQuery = searchQuery.concat(trails);
        console.log("not null", searchQuery)
    } 
    if (searchQuery === null || searchQuery === "") {
        searchQuery = 'test3333';
    }


    initMap(searchQuery);
    getCityLocation(searchQuery);
}

<<<<<<< HEAD



function initMap() {
    // make these coords update dynamically
    const initLocation = new google.maps.LatLng(-33.867, 151.195);
    console.log("inside initmap", searchQuery);
=======
function getCityLocation(getCity) {
    // gets users input, either via form or button from history
    var getCityName = getCity.split("+");
    getCityName = getCityName[0];
    getCityName = getCityName.split(' ').join('+');
    console.log("This is getCity", getCityName);
>>>>>>> e0a76d30d5575a7c6e56ffbce365c985852eaf31

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
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: initLocation,
        zoom: 15,
    });

    const request = {
        query: searchQuery,
        fields: ['name', 'location'],
    };
    console.log("This is the request", request)


    service = new google.maps.places.PlacesService(map);
    console.log("not nul3l", request)

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

                // create container to stack trail name, address and other elements
                var trailItemDivEl = document.createElement('div');
                trailItemDivEl.classList = "trail-name-element w-full items-left bg-white mt-1 p-2 rounded-lg border border-slates-200 shadow-md md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
                trailItemDivEl.setAttribute('id', "trail-name-element")

                // create a button element to hold trail name
                var trailItemNameEl = document.createElement("button");
                trailItemNameEl.classList = "btn block mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white text-left";
                trailItemNameEl.setAttribute("type", "button")
                trailItemNameEl.setAttribute('id', "trail-name-" + [i])
                trailItemNameEl.addEventListener("click", saveFavoriteTrail)
                trailItemNameEl.textContent = trailName;
                

                // create a p element to hold trail location
                var trailItemLocationEl = document.createElement("p");
                trailItemLocationEl.classList = "text-xs w-2/3 text-left font-normal text-gray-700 dark:text-gray-400";
                trailItemLocationEl.setAttribute('id', "trail-address-" + [i]);
                trailItemLocationEl.textContent = trailLocation;

                // add header and p element to div wrapper
                trailItemDivEl.appendChild(trailItemNameEl);
                trailItemDivEl.appendChild(trailItemLocationEl);

                // append div to trail list item container
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
