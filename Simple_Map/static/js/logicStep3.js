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
    center: [39.5,-98.5,3],
    zoom: 2,
    layers: [streets]   
})
L.control.layers(baseMaps).addTo(map);

//Grabbing our GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    //Creating GeoJSON layer with the retrieved data.
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    function getColor(magnitude){
            if(magnitude >5){
                return "#ea2c2c";
            }
            if(magnitude >4){
                return "#ea822c";
            }
            if (magnitude >3){
                return "#ee9c00";
            }
            if(magnitude >2){
                return "#eecc00";
            }
            if(magnitude >1){
                return "#d4ee00";
            }
            return "#98ee00";
    }
    function getRadius(magnitude){
        if(magnitude === 0 ){
            return 1;
        }
        return magnitude *4;
    }
    L.geoJSON(data,{
        //We turn each feature into a circle Marker on map.
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
        //set the style for each circle Marke using styleInfo function.
        style: styleInfo,
        //create popup for each circleMarker to display magnitude and
        //location of earthquake after marker has been created and styled.
        onEachFeature: function(feature, layer){
            layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: " + feature.properties.place);
        }
    }).addTo(map);
});
