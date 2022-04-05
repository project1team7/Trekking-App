// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

function initMap() {
    // make these coords update dynamically
    const sydney = new google.maps.LatLng(-33.867, 151.195);
    let searchQuery = document.getElementById('location-input').value;
    console.log(searchQuery);
    if (searchQuery === null || searchQuery === "") {
        searchQuery = 'trails';
    };
    console.log(searchQuery);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
    });

    const request = {
        query: searchQuery,
        fields: ['ALL'],
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, (results, status) => {
        console.log(results)
        // map.center(results[0]);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
                // createMarker(results[i]);
                // create unordered list group
                var trailName = results[i].name;
                var trailLocation = results[i].formatted_address;

                // create a container (in the form a link) for each trail list item
                var trailContainerEl = document.createElement("a");
                trailContainerEl.classList = "flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
                trailContainerEl.setAttribute('id', "trail-list-item");
                trailContainerEl.setAttribute("href", "#")

                // create container to stack trail name, address and other elements
                var trailItemDivEl = document.createElement('div');
                trailItemDivEl.classList = 'flex flex-col justify-between p-4 leading-normal';

                // create a h5 element to hold trail name
                var trailItemNameEl = document.createElement("h5");
                trailItemNameEl.classList = "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left";
                trailItemNameEl.setAttribute('id', "trail-name");
                trailItemNameEl.textContent = trailName;
                console.log(trailItemNameEl);

                // create a p element to hold trail location
                var trailItemLocationEl = document.createElement("p");
                trailItemLocationEl.classList = "mb-3 font-normal text-gray-700 dark:text-gray-400";
                trailItemLocationEl.setAttribute('id', "trail-address");
                trailItemLocationEl.textContent = trailLocation;

                // add header and p element to div wrapper
                trailItemDivEl.appendChild(trailItemNameEl);
                trailItemDivEl.appendChild(trailItemLocationEl);

                // append div to trail list item container
                trailContainerEl.appendChild(trailItemDivEl);
                results[i] = trailContainerEl;

                // append container to the dom
                let trailList = document.getElementById('trail-list');

                trailList.appendChild(trailContainerEl);

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
            map.setCenter(sydney);
        }
    });
}
// TODO: add marker at each trail locaiton
