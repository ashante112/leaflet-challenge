var createdMap = false;
var myMap;
var myMarker;

function init() {

  var dropdownMenu = d3.select("#selDataset");
  d3.json("data/volcano.json").then((data) => {
    // console.log(data.features);
    var sampleNames = data.features;
    var volcanoIdList = [];
    var metadata = [];
    for (i = 1; i < sampleNames.length; i++) {
      volcanoIdList.push(sampleNames[i].properties.VolcanoID)
      metadata.push(sampleNames[i].properties)
    }

    volcanoIdList.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });
    console.log(sampleNames[0].properties.VolcanoID)

    console.log(metadata)
    var output = metadata[0];

    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(output).forEach(([key, value]) => {
      PANEL.append("h5").text(`${key.toUpperCase()}: ${value}`);

    });
    console.log(output.Latitude)
    console.log(output.Longitude)
    renderMap(output.Latitude,output.Longitude)
  });

}


function metaData(selectedVolcanoID) {

  d3.json("data/volcano.json").then((data) => {

    var sampleNames = data.features;
    var volcanoData = [];
    for (i = 1; i < sampleNames.length; i++) {

      volcanoData.push(sampleNames[i].properties)
    }
    var outputArray = volcanoData.filter(sampleObject => sampleObject.VolcanoID == selectedVolcanoID);

    console.log(outputArray);
    var output = outputArray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(output).forEach(([key, value]) => {
      PANEL.append("h5").text(`${key.toUpperCase()}: ${value}`);


    });
    console.log(output.Latitude)
    console.log(output.Longitude)
    renderMap(output.Latitude,output.Longitude)

  });


}



//Function to show data for new sample
function optionChanged() {
  //create a variable to reference the dropdown where test subject can be changed
  var menuOption = d3.select("#selDataset");
  //create variable to select value for whatever user puts into this field
  var userSelection = menuOption.property("value");
  //run metadata and create chart function fors the new user choice
  metaData(userSelection);

}


function renderMap(latitude, longitude) {
  if (createdMap) {
    myMap.panTo(new L.LatLng(latitude, longitude));
    myMarker.setLatLng([latitude, longitude]);
    return;
  }

  createdMap = true;

  myMap = L.map("map", {
    center: [latitude, longitude],
    zoom: 12
  });

  
  myMarker = L.marker([latitude, longitude]).addTo(myMap);
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    // attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap); 
}
init();

function scrapeDeadlyEruptions(){
  

}

