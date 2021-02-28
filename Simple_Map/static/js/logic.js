// create tile layer that is the background of the map.
// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Street: light,
    Dark: dark
};

let map = L.map('mapid',{
    center: [44.0,-80.0],
    zoom: 2,
    layers: [light]   
})
L.control.layers(baseMaps).addTo(map);

//Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/tlin41390/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Simple_Map/torontoRoutes.json";
//Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data){
    console.log(data);
    //Create GeoJSON layer with the retrieved data.
    L.geoJson(data,{
        color: "#ffffa1",
        weight: 2,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline: "+ feature.properties.airline+ "</h3> <hr><h3> Destination: "
            + feature.properties.dst +"</h3>");
        }
    })
    .addTo(map);
});
