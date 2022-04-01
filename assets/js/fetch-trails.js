var trailCardEl = $("#find-trails-card");
var trailListEl = $("#trail-list");
var locationInputEl = $("#location-input").val() == undefined ? '' : $("#location-input").val().trim();
// let queryLat;
// let queryLong;
// let queryLocation = { "lat": queryLat, "lng": queryLong }

var formSubmitHandler = function(event) {
    var location = locationInputEl;

    // prevent page from refreshing
    event.preventDefault();

    if (!location) {
        // replace alert with modal in the future
        alert("Please enter a location");
        
    } else {
        console.log('Finding Trails');
        getTrails(trails);
    }
};

var getTrails = function(location) {
    let apiKey = "AIzaSyBms50hG4fUuaVtpHAf4moqjddWuBv-LTY";
    // needs to have a query (trails), location (latitude and longitude --> chose by user), and radius (e.g., 5000)
    // var apiUrl = "https://maps.googleapis.com/maps/api/js?query=" + querySearchTerm + "&location=" + queryLocation + "&key=" + apiKey + "&libraries=places&v=weekly";
    var apiUrl = "https://maps.googleapis.com/maps/api/place/textsearch/js?query=trails&key=" + apiKey + "";

    // the fetch needs to occur within a handler function
    // make a get request to url
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayTrails(data, location);
            });
        } else {
            alert("Error: " + response.statusText);
        }
        })
        .catch(function(error) {
        alert("Unable to connect to Google Maps");
    });
    trailListContainerEl.textContent = "";
    locationInputEl.value = "";
};

var displayTrails = function(trails, location) {
  // check if api returned any repos
  if (trails.length === 0) {
    trailListContainerEl.textContent = "Did not find trails at this location. Try somewhere else.";
    return;
  }

//   placeSearchTerm = location;

  for (var i = 0; i < trails.length; i++) {
    var trailName = trails[i].name;
    // var trailLocation = trails[i].location;

    // create a container (in the form a link) for each trail list item
    var trailListItemEl = document.createElement("a");
    trailListItemEl.classList = "flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
    trailListItemEl.setAttribute('id', "trail-list-item");
    trailListItemEl.setAttribute("href", "#")

    // create container to stack trail name, address and other elements
    var trailListItemDivEl = document.createElement('div');
    trailListItemDivEl.classList = 'flex flex-col justify-between p-4 leading-normal';

    // create a h5 element to hold trail name
    var trailListItemNameEl = document.createElement("h5");
    trailListItemNameEl.classList = "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    trailListItemNameEl.setAttribute('id', "trail-name");
    trailListItemNameEl.textContent = trailName;

    // create a p element to hold trail location
    var trailListItemLocationEl = document.createElement("p");
    trailListItemLocationEl.classList = "mb-3 font-normal text-gray-700 dark:text-gray-400";
    trailListItemLocationEl.setAttribute('id', "trail-address");
    trailListItemLocationEl.textContent = "trailLocation";
    // trailListItemLocationEl.textContent = trailLocation;

    trailListItemDivEl.appendChild(trailListItemNameEl);
    trailListItemDivEl.appendChild(trailListItemLocationEl);

    // append name to list item container
    trailListItemEl.appendChild(trailListItemDivEl);

    // append container to the dom
    trailListEl.appendChild(repoEl);
  }
};

$(()=>{

    // add event listeners to forms
    trailCardEl.on("click", 'button', formSubmitHandler);

})