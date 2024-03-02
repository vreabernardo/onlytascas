import {getpolyline} from './getPolyLine.js';

let map;

export async function initMap(data, API_KEY) {
  
  const { Map } = await google.maps.importLibrary("maps");
  
  const firstPlace = data[0][0];
  const finalPlace = data[1][0];

  const waypoints = data.slice(1, data.length).map(waypoint => ({
    location: {
      latLng: {
        latitude: waypoint[0]["lat"],
        longitude: waypoint[0]["lng"]
      }
    }
  }));


  console.log('waypoints:', waypoints);



  getpolyline(firstPlace, finalPlace, waypoints, API_KEY)
      .then(result => {
          
          let route_encoded = result["routes"][0]["polyline"]["encodedPolyline"];
          
          map = new Map(document.getElementById("map"), {
            center: data[0][0],
            zoom: 16,
            disableDefaultUI: true,    
            // all this code for dark mode lmao, google devs be wilding 
            // soon the code for styles and markers will be deprecated by google, so I need to find a new way to do this
            styles: [
              {
                "featureType": "poi.attraction",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.government",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.medical",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.place_of_worship",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.school",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.sports_complex",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
          });
          // set markers
          for (const key in data) {
            let position = data[key][0];
            new google.maps.Marker({
              position,
              map,
              label: {
                text: data[key][1],
                color: 'white',
                fontSize: "20px"
              }
              
            });
          }
          // decode polyline
          var decodedPath = google.maps.geometry.encoding.decodePath(route_encoded);
          var decodedLevels = decodeLevels("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
          var setRegion = new google.maps.Polyline({
            path: decodedPath,
            levels: decodedLevels,
            strokeColor: "#ff99ff",
            strokeOpacity: 1.0,
            strokeWeight: 7,
            map: map
        });
        })

      .catch(error => {
          console.error('Error in main route:', error);
      });

}

function decodeLevels(encodedLevelsString) {
  var decodedLevels = [];

  for (var i = 0; i < encodedLevelsString.length; ++i) {
      var level = encodedLevelsString.charCodeAt(i) - 63;
      decodedLevels.push(level);
  }
  return decodedLevels;
}