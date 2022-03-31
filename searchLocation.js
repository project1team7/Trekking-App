// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;
let autocomplete;
// const toronto = new google.maps.LatLng(-79.38924548447105, 43.642570061135956);
var trailList = $('#trail-list');
var trailItem = $('#trail-item').innerHTML;
var addressAutocomplete = $('#address-autocomplete')

var initAutocomplete = function() {
  autocomplete = new google.maps.places.Autocomplete(
    addressAutocomplete,
    {
      keyword: ['trails', 'trails', 'hike', 'hiking', 'walk', 'exercise'],
      fields: ['place_id', 'geometry', 'name']
  });
  autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
  var place = autocomplete.getPlace();

  if (!place.geometry) {
    // user did not select a prediction; reset the input field
    addressAutocomplete.placeholder = 'Enter a Zip/Postal Code';
  }
  else {
    // Display details about the valid place
    trailItem.innerHTML = place.name;
  }
}

$(document).ready(function() {

  var map = "https://maps.googleapis.com/maps/api/place/details/json?libraries=places&callback=initAutocomplete&radius=5000&key=AIzaSyBms50hG4fUuaVtpHAf4moqjddWuBv-LTY";
  // var chosenLocation = new google.maps.places.Autocomplete(chosenLocationAddress);
          
  // make this function fire on click of find trails button 
  if ('geolocation' in navigator) {
    $('#find-trails').on('click', () => {
        console.log('Geolocation is available.')
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            
            getPlaceDetails();
          
              // google.maps.event.addEventListener(chosenLocation, 'place_changed', function() {
          
              // var place = chosenLocation.getPlace();
              // console.log(place.formatted_address)
              // console.log(place.url)
              // console.log(place.geometry.location)
          
            

        });
    });
  }
  else {
      console.log('Geolocation is not supported.')
  }
});


  // const request = {
  //   query: toronto,
  //   fields: ["name", "geometry"],
  // };

//   https://maps.googleapis.com/maps/api/place/details/json
//   ?fields=name%2Crating%2Cformatted_phone_number
//   &place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
//   &key=YOUR_API_KEY

  // service.findPlaceFromQuery(request, (results, status) => {
  //   if (status === google.maps.places.PlacesServiceStatus.OK && results) {
  //     for (let i = 0; i < results.length; i++) {
  //         trailList.appendChild(trailItem);
  //       // createMarker(results[i]);
  //     }

  //   //   map.setCenter(results[0].geometry.location);
  //   }
  // });
// }

// function createMarker(place) {
//   if (!place.geometry || !place.geometry.location) return;

//   const marker = new google.maps.Marker({
//     map,
//     position: place.geometry.location,
//   });

//   google.maps.event.addListener(marker, "click", () => {
//     infowindow.setContent(place.name || "");
//     infowindow.open(map);
//   });
// }