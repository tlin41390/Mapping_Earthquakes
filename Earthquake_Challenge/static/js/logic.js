// create tile layer that is the background of the map.
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    Street: streets,
    Satellite_Streets: satelliteStreets
};

let map = L.map('mapid',{
    center: [43.7,-79.3],
    zoom: 2,
    layers: [satelliteStreets]   
})
L.control.layers(baseMaps).addTo(map);

//Accessing the Toronto airline routes GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/tlin41390/Mapping_Earthquakes/main/torontoNeighborhoods.json"
//Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data){
    console.log(data);
    //Create GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        fillColor:"yellow",
        color:"yellow",
        weight:1,
        onEachFeature: function(feature,layer){
            layer.bindPopup("<h3> Neighborhood: "+feature.properties.AREA_NAME+ "</h3>")
        }
    }).addTo(map);
});
