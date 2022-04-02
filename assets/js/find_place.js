let apiKey = "AIzaSyBms50hG4fUuaVtpHAf4moqjddWuBv-LTY";
let apiUrl;
var find_button = $('#find-button');
// var find_trails_card = $('#find-trails-card');

$(() => {
    // handleFindTrailsSubmit = () => {
    //     find_button.on('click', findTrails);
    // };
    // findTrails();
    fetchTrails();
});

fetchTrails = () => {
    apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=trails&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Cgeometry&key='
        + apiKey;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify({
        })
    })
        .then(response => {
            // indicates whether the response is successful (status code 200-299) or not
            if (!response.ok) {
                console.log('unsuccessful')
                throw new Error(`Request failed with status ${response.status}`)
            }
            else {
                console.log('SUCCESS')
                return response.json()
            }
        })
        .then(data => {
            console.log(data.count)
            console.log(data.products)
        })
        .catch(error => console.log(error))
}


// const findTrails = new Promise((resolve, reject) => {
//     fetchTrails()
//         .then(response => {
//             // indicates whether the response is successful (status code 200-299) or not
//             if (!response.ok) {
//                 console.log('unsuccessful')
//                 throw new Error(`Request failed with status ${response.status}`)
//             }
//             else {
//                 console.log('SUCCESS')
//                 return response.json()
//             }
//         });
// });
