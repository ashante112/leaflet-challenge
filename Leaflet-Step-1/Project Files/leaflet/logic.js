
var { light, dark, street } = createBaseLayers();

// var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var volcanoMarkers = [];
var tectonicPlateMarkers = [];

var ringOfFireMArkers =[];

var volcanoLayer =new L.layerGroup();
var tectonicLayer = new L.layerGroup();
// Create map object and set default layers
var myMap = L.map("map", {
  center: [13.0827, 80.2707],
  zoom: 2,
  layers: [dark,volcanoLayer]
});


d3.json("GeoJSON/volcano.json", parseJSON);
d3.json("GeoJSON/PB2002_boundaries.json", parseBoundariesJSON);

//var volcanoLayer = L.layerGroup(volcanoMarkers);
//var tectonicLayer = L.layerGroup(tectonicPlateMarkers);

// Only one base layer can be shown at a time
var baseMaps = {
  "Light": light,
  "Dark": dark,
  "Street": street
};

// Overlays that may be toggled on or off
var overlayMaps = {
  "Volcano": volcanoLayer,
  "Tectonic Plates"  : tectonicLayer,

};



// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


var legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend
legend.onAdd = function () {
  var div = L.DomUtil.create("div", "info legend");

  var grades = [2, 3, 4, 5, 6, 7];
  var colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  div.innerHTML += "<h4> P E I  </h4> " ;
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
  }
  return div;
}

// Finally, we our legend to the map.
legend.addTo(myMap);



function createBaseLayers() {
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var street = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
  });
  return { light, dark, street };
}

function parseJSON(response) {
    console.log("volcano response");
    console.log(response);
    console.log( response.features.length);
  for (var i = 0; i < response.features.length; i++) {
    var volcano = response.features[i];
    var mCircle = L.circle([volcano.geometry.coordinates[1], volcano.geometry.coordinates[0]], {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(volcano.properties.PEI),
      radius: getRadius(volcano.properties.PEI),
      stroke: true,
      weight: 0.2
    }).bindPopup("<h2>" + volcano.properties.V_Name + "</h2> <hr> <h3>Volcano ID: " +
    volcano.properties.VolcanoID + "</h3> <hr> <h3> PEI  :" + volcano.properties.PEI + "</h3>").addTo(volcanoLayer);

    //volcanoMarkers.push(mCircle);
   
  }
}

function getRadius(magnitude) {
  return magnitude * Math.pow(magnitude / 10.0, 2) * 100000;
}

function getColor(depth) {
  switch (true) {
    case depth > 6:
      return "#ea2c2c";
    case depth > 5:
      return "#ea822c";
    case depth > 4:
      return "#ee9c00";
    case depth > 3:
      return "#eecc00";
    case depth > 2:
      return "#d4ee00";
    default:
      return "#98ee00";
  }
}





function parseBoundariesJSON(response) {
  console.log("tectanic plate boundary response")
  console.log(response);
  tectonicPlateMarkersList=[];
  for (var i = 0; i < response.features.length; i++) {
      for ( var j=0; j < response.features[i].geometry.coordinates.length; j++){
        
              var coord = response.features[i].geometry.coordinates[j];
              tectonicPlateMarkersList.push(coord)              
      }
  }
  for (x=0; x< tectonicPlateMarkersList.length; x++){

     var plateCircle = L.circle([tectonicPlateMarkersList[x][1],tectonicPlateMarkersList[x][0]], {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.5,
          radius: 1,
          stroke: true,
          weight: 0.1
      }).addTo(tectonicLayer);

      //tectonicPlateMarkers.push(plateCircle)
  }
}


d3.csv("GeoJSON/Volcano_Emission.csv", function(data) {
  for (var i = 0; i < 10; i++) {
      console.log(data[i]);      
  }
});