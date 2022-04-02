let trailList;
let trailListItem;

var button = $('#find-button');

$(document).ready(function(){
  button.on('click', () => {
    navigator.geolocation.getCurrentPosition(geoSuccess);
    // for (var i = 0; i < 5; i++) {
    //  createTrailListItem();
    //   console.log(trailList);
    // }
    console.log('creating list item');
    createTrailListItem();
  });
  if (navigator.geolocation) {
      console.log('Geolocation permissions have been enabled.')
      
      window.onload = function () {
        var startPos;
        var geoSuccess = function (position) {
          startPos = position;
          document.getElementById('startLat').innerHTML = startPos.coords.latitude;
          document.getElementById('startLon').innerHTML = startPos.coords.longitude;
        };            
      };    
  }
  else {
      console.log('Geolocation is not supported.')
  }
});

var createTrailListItem = () => {
  trailList = document.createElement('ul');
  trailListItem = document.createElement('a');
  trailListItem.classList = "flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";
  var img = document.createElement('img');
  img.classList = "object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
  trailListItem.appendChild(img);
  // add attribute for src to get image address from google
  var div = document.createElement('div');
  div.classList = "flex flex-col justify-between p-4 leading-normal";
  var h5 = document.createElement('h5');
  h5.classList = "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  var p = document.createElement('p');
  p.classList = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  div.appendChild(h5, p);
  trailListItem.appendChild(div);

  trailList.appendChild(trailListItem);
}

// var handleSearch = function() {
//     button.on('click', () => {
//         var startPos;
//         var nudge = document.getElementById('nudge');
      
//         var showNudgeBanner = function () {
//           nudge.style.display = 'block';
//         };
      
//         var hideNudgeBanner = function () {
//           nudge.style.display = 'none';
//         };
      
//         var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);
      
//         var geoSuccess = function (position) {
//           hideNudgeBanner();
//           // We have the location, don't display banner
//           clearTimeout(nudgeTimeoutId);
      
//           // Do magic with location
//           startPos = position;
//           document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//           document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//         };
//         var geoError = function (error) {
//           switch (error.code) {
//             case error.TIMEOUT:
//               // The user didn't accept the callout
//               showNudgeBanner();
//               break;
//           }
//         };
      
//         navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//     });
// }