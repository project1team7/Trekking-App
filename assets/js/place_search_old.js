
var trailCardEl = $("#find-trailList-card");
var trailList = $("#trail-list");
var locationInputEl = document.querySelector("input[name='location-input']");
let queryLoc;
// let queryLat;
// let queryLong;
// let queryLocation = { "lat": queryLat, "lng": queryLong }

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// findTrailsButtonHandler = (event) => {
//     // prevent page from refreshing
//     event.preventDefault();
//     console.log(locationInputEl.textContent);
//     displayTrails(trailList)
// };

var getTrails = function (queryLoc) {
  queryLoc = locationInputEl.text;
  let apiKey = "AIzaSyBms50hG4fUuaVtpHAf4moqjddWuBv-LTY";
  // needs to have a query (trailList), location (latitude and longitude --> chose by user), and radius (e.g., 5000)
  // var apiUrl = "https://maps.googleapis.com/maps/api/js?query=" + querySearchTerm + "&location=" + queryLocation + "&key=" + apiKey + "&libraries=places&v=weekly";
  var apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20'
    + queryLoc +
    '&inputtype=textquery&callback=initMap&fields=formatted_address%2Cname%2Cgeometry&key='
    + apiKey;
  const myInit = {
    method: 'GET',
    headers: {},
    mode: 'no-cors',
    cache: 'default',
  };

  const myRequest = new Request(apiUrl, myInit);

  // the fetch needs to occur within a handler function
  // make a get request to url
  fetch(myRequest)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log(response)
      displayTrails(response, queryLoc)
    })
    .catch(function (error) {
      console.log(error);
    });
  // locationInputEl.value = "";
};

var trailDataObj = {
  "name": "Placeholder name",
  "location": {
    "latitude": "42.50",
    "longitude": "-85.50",
  },
  "img": ""
}

var createTrailEl = function (trailDataObj) {
  var trailListItemEl = document.createElement("li");
  trailListItemEl.className = "trail-list-item";

  // add task id as a custom attribute
  trailListItemEl.setAttribute("data-task-id", trailIdCounter);

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
  trailItemNameEl.classList = "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  trailItemNameEl.innerHTML = trailDataObj.name;

  // create a p element to hold trail location
  var trailItemLocationEl = document.createElement("p");
  trailItemLocationEl.classList = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  trailItemLocationEl.setAttribute('id', "trail-address");
  trailItemLocationEl.textContent = "trailLocation";

  trailListItemEl.appendChild(taskInfoEl);

  trailListEl.appendChild(trailListItemEl);

  // increase task counter for next unique id
  trailIdCounter++;
};

displayTrails = (trailList) => {
  // check if api returned any repos
  if (trailList.length === 0) {
    return;
  }

  //   placeSearchTerm = location;
  for (var i = 0; i < trailList.length; i++) {
    var trailName = trailList[i].name;
    // var trailLocation = trailList[i].location;

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
    trailItemNameEl.classList = "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    trailItemNameEl.setAttribute('id', "trail-name");
    trailItemNameEl.textContent = trailName;

    // create a p element to hold trail location
    var trailItemLocationEl = document.createElement("p");
    trailItemLocationEl.classList = "mb-3 font-normal text-gray-700 dark:text-gray-400";
    trailItemLocationEl.setAttribute('id', "trail-address");
    trailItemLocationEl.textContent = "trailLocation";
    // trailListItemLocationEl.textContent = trailLocation;

    trailItemDivEl.appendChild(trailItemNameEl);
    trailItemDivEl.appendChild(trailItemLocationEl);

    // append name to list item container
    trailContainerEl.appendChild(trailItemDivEl);

    // append container to the dom
    trailList.appendChild(trailListItemEl);
  }
};

$(() => {

  // add event listeners to forms
  trailCardEl.on("click", 'button', findTrailsButtonHandler);

})