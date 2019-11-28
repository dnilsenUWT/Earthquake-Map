//copy your access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g';

var map = new mapboxgl.Map({
  container: 'map2', // HTML container id
  style: 'mapbox://styles/dnilsen/ck2wofoys1uqr1cp9458jjal0', // style URL
  center: [-95, 40], // starting position as [lng, lat]
  zoom: -1
});


      //on map load, run function to load the geojson
      map.on('load', function(){
        //add a source layer for earthquakes
        map.addSource('earthquakes2', {
              "type": "geojson",
              "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

        });
          //add the earthquakes to the map
          map.addLayer({
            "id":"equakes2",
            "type":"circle",
            "source":"earthquakes2",
            "paint": {
            // // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                property: 'mag',
                stops: [
                [{zoom: 1, value: 0}, 0],
                [{zoom: 1, value: 10}, 50],
              ]},
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              'circle-color': "#6f1a16"
            }
          });
      });

      //add a handler for clicking/popups
      //Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
      map.on('click', 'equakes2', function (e) {
            //1. set the coordinates of the popup
            var coordinates = e.features[0].geometry.coordinates;
            //2. create the information that will display in the popup
            // var description = e.features[0].properties.mag;
            var description = "<h3>"+e.features[0].properties.title+"</h3>"+"<p>Magnitude: " + e.features[0].properties.mag + "<br>Status: " + e.features[0].properties.status + "<br> Tsunami: " + e.features[0].properties.tsunami + "</p>";
            //3. make the popup
            new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
      });

// var popup = new mapboxgl.Popup()
//     .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');
//
// var marker = new mapboxgl.Marker()
// 	.setLngLat([-21.9270884, 64.1436456])
// 	.setPopup(popup)
// 	.addTo(map);
