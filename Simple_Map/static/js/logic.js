//Add console.log to check to see if our code is working
let map = L.map('mapid').setView([30, -30],2);

// create tile layer that is the background of the map.
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    Street: streets,
    Dark: dark
};

let view = L.map('mapid',{
    center: [30,30],
    zoom: 2,
    layers: [streets]   
})

L.control.layers(baseMaps).addTo(view);
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/tlin41390/Mapping_Earthquakes/main/majorAirports.json";

//Grab GeoJSON data
d3.json(airportData).then(function(data){
    console.log(data);
    //Creating a GeoJSON layer with retrieved data.
    L.geoJson(data,{
    //turn each feature into a marker on the map.
        onEachFeature: function(feature, layer){
            console.log(layer);
            layer.bindPopup("<h2>"+"Airport Code:"+feature.properties.faa+"</h2> <hr> <h3>Airport Name: "+ feature.properties.name+"</h3>");
        }
        }).addTo(map);
});
// Add GeoJSON data.
let sanFranAirport =
{"type": "FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city": "San Francisco",
        "country":"United States",
        "faa": "SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
        ]};
//Grabbing the GeoJson data.
L.geoJSON(sanFranAirport).addTo(map);

L.geoJson(sanFranAirport,{
    //turn each feature into a marker on the map.
    onEachFeature: function(feature, layer){
        console.log(layer);
        layer.bindPopup("<h2>"+"Airport Code:"+feature.properties.faa+"</h2> <hr> <h3>Airport Name: "+ feature.properties.name+"</h3>");
    }
}).addTo(map);
