var url = 'https://corona.lmao.ninja/v2/countries';
var data_from_all_world = new Array;
var countries = new Array;
var cases = new Array;
var deaths = new Array;
var today_cases = new Array;
var latitude = new Array;
var longitude = new Array;
var fetched = false;
var colors = ['red', 'green', 'blue', 'purple', 'yellow', 'pink', 'orange'];

fetch(url)
  .then(res => res.json())
  .then((out) => {
    data_from_all_world.push(out);

    for (var i = 0; i < data_from_all_world[0].length; i++) {
      countries.push(data_from_all_world[0][i].country);
      cases.push(data_from_all_world[0][i].cases);
      deaths.push(data_from_all_world[0][i].deaths);
      today_cases.push(data_from_all_world[0][i].todayCases);
      latitude.push(data_from_all_world[0][i].countryInfo.lat);
      longitude.push(data_from_all_world[0][i].countryInfo.long);
    }

  }).catch(err => console.error(err));

setTimeout(function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoicHJ6ZW1xcSIsImEiOiJja2dlNG1nbzExNzVjMndzNTFidGxmNWg0In0.IlnYOe9hGkPPMOfc4qv3zA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
  });
  for (var i = 0; i < data_from_all_world[0].length; i++) {
    var rand = Math.floor(Math.random() * colors.length);
    new mapboxgl.Marker({
      color: colors[rand]
    })
      .setLngLat([longitude[i], latitude[i]])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + countries[i] + '</h3><p>' + "Cases: " + cases[i] + '</p>' + '<p>' + "deaths: " + deaths[i] + '</p>' + '<p>'))
      .addTo(map);
  }
}, 2000);