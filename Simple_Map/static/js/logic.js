//Add console.log to check to see if our code is working
let map = L.map('mapid').setView([37.6213, -122.3790],5);

// create tile layer that is the background of the map.
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
//Get data from cities.js

let line = [
    [33.9416, -118.4085],
    [37.6213,-122.3790],
    [40.7899,-111.9791],
    [47.4502,-122.3088]
];

let airportRoute = [
    [37.6215083120081, -122.37898758089858],
    [30.197591590241906, -97.66626706206424],
    [43.677810667728835, -79.62461584807939],
    [40.64140060895507, -73.77807472388615],
];
L.polyline(airportRoute, {
    strokeOpacity:0,
    weight: '4',
    dashArray: '10, 10',
    dashOffset: '20'
    
}).addTo(map);