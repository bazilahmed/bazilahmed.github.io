var myHeatMap = L.map("heatMap", {
    center: [39.0119, -98.4842],
    zoom: 4
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myHeatMap);
  
  var yelp_json = "static/js/yelp_data.json";

  
  d3.json(yelp_json, function(restaurant) {

  
    var heatArray = [];


    for (var i = 0; i < restaurant.length; i++) {
    // for (var i = 0; i < 4 ; i++) {
      var lat = restaurant[i].Latitude;
      var lng = restaurant[i].Longitude;
    //   console.log(lat);
    //   console.log(lng);
      if (lat && lng) {
        // console.log("entered the if")
        heatArray.push([lat, lng]);
      }
    }

    var heat = L.heatLayer(heatArray, {
        radius: 20, 
        blur: 30
    }).addTo(myHeatMap);
  
  });
  