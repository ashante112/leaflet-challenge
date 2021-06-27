var myMap = L.map("map", {
    center: [13.0827, 80.2707],
    zoom: 2
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  }).addTo(myMap);




function parsePlatesJSON(response) {
    var tectonicPlateMarkers = [];
    console.log(response);
   // console.log(response)
   // console.log(response.features[0].geometry.coordinates[0][0])
    for (var i = 0; i < response.features.length; i++) {
        for ( var j=0; j < response.features[i].geometry.coordinates.length; j++){
            for (var k = 0; k < response.features[i].geometry.coordinates[0].length; k++){
               // console.log(response.features[i].geometry.coordinates[0].length);
                var coord = response.features[i].geometry.coordinates[0][k];
                tectonicPlateMarkers.push(coord)  
            }            
        }
    }
    console.log("tectonicPlateMarkers")
    console.log(tectonicPlateMarkers)

    for (x=0; x< tectonicPlateMarkers.length; x++){

       var plateCircle = L.circle([tectonicPlateMarkers[x][1],tectonicPlateMarkers[x][0]], {
            color: "red",
            fillColor: "red",
            fillOpacity: 0.5,
            radius: 1
        })

        plateCircle.addTo(myMap);
    }
}



function parseBoundariesJSON(response) {
    console.log(response)
    var tectonicPlateMarkers = [];
   console.log("Boundaries")
   // console.log(response.features[0].geometry.coordinates[0][0])
    for (var i = 0; i < response.features.length; i++) {
        for ( var j=0; j < response.features[i].geometry.coordinates.length; j++){
           // for (var k = 0; k < response.features[i].geometry.coordinates[0].length; k++){
               // console.log(response.features[i].geometry.coordinates[0].length);
                var coord = response.features[i].geometry.coordinates[j];
                tectonicPlateMarkers.push(coord)  
            //}            
        }
    }
    console.log("tectonicPlateMarkers")
    console.log(tectonicPlateMarkers)

    for (x=0; x< tectonicPlateMarkers.length; x++){

       var plateCircle = L.circle([tectonicPlateMarkers[x][1],tectonicPlateMarkers[x][0]], {
            color: "red",
            fillColor: "red",
            fillOpacity: 0.5,
            radius: 1
        })

        plateCircle.addTo(myMap);
    }
}


//d3.json("GeoJSON/PB2002_plates.json", parsePlatesJSON);
d3.json("GeoJSON/PB2002_boundaries.json", parseBoundariesJSON);
// d3.json("GeoJSON/PB2002_orogens.json", testparseJSON);
// d3.json("GeoJSON/PB2002_steps.json", testparseJSON);

