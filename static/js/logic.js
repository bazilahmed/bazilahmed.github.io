// Creating map object
var myMap = L.map("clusterMap", {
  center: [39.0119, -98.4842],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// TODO:

// Store API query variables
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// Add the dates in the ISO formats
var date = "$where=created_date between '' and ''";
// Add the complaint type
var complaint = "&complaint_type=";
// Add a limit
var limit = "&$limit=";


// Assemble API query URL or offline file
var yelp_json = "static/js/yelp_data.json";

// Grab the data with d3
d3.json(yelp_json, function(restaurant) {

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < restaurant.length; i++) {

    // Set the data location property to a variable
    var lat = restaurant[i].Latitude;
    var lng = restaurant[i].Longitude;

    // Check for location property
    if (lat && lng) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, lng])
      .bindPopup('<h5>' + restaurant[i].Name + '</h5> <hr> <h6>Total Reviews: <strong>' + restaurant[i][ 'Total Reviews' ] +  '</strong>, Rating : <strong>' + restaurant[i][ 'Star Rating' ] + '</strong> </h6>'));
    }

}
  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
