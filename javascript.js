//copy your access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiZG5pbHNlbiIsImEiOiJjazIzeHFyd3kwMm03M25rNGkyNnJuODFjIn0.THS8KaBhpFTcgWOjMpp6_g';

var map1 = new mapboxgl.Map({
  container: 'map1', // HTML container id
  style: 'mapbox://styles/dnilsen/ck2wofoys1uqr1cp9458jjal0', // style URL
  center: [-95, 40], // starting position as [lng, lat]
  zoom: -1
});


      //on map load, run function to load the geojson
      map1.on('load', function(){
        //add a source layer for earthquakes
        map1.addSource('earthquakes1', {
              "type": "geojson",
              "data": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

        });
          //add the earthquakes to the map
          map1.addLayer({
            "id":"equakes1",
            "type":"circle",
            "source":"earthquakes1",
            "paint": {
            // // make circles larger as the user zooms from z12 to z22
              'circle-radius': {
                property: 'mag',
                stops: [
                [{zoom: 1, value: 0}, 0],
                [{zoom: 1, value: 10}, 10],
              ]},
            // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
              'circle-color': "#273b66"
            }
          });
      });

      //add a handler for clicking/popups
      //Thanks to: https://www.mapbox.com/mapbox-gl-js/example/popup-on-click/
      map1.on('click', 'equakes1', function (e) {
            //1. set the coordinates of the popup
            var coordinates = e.features[0].geometry.coordinates;
            //2. create the information that will display in the popup
            // var description = e.features[0].properties.mag;
            var description = "<h3>"+e.features[0].properties.title+"</h3>"+"<p>Magnitude: " + e.features[0].properties.mag + "<br>Status: " + e.features[0].properties.status + "<br> Tsunami: " + e.features[0].properties.tsunami + "</p>";
            //3. make the popup
            new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map1);
      });

// var popup = new mapboxgl.Popup()
//     .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');
//
// var marker = new mapboxgl.Marker()
// 	.setLngLat([-21.9270884, 64.1436456])
// 	.setPopup(popup)
// 	.addTo(map);
