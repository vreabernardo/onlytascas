export function getpolyline(firstplace, finalplace, waypoints) {
    const apiKey = "AIzaSyD5HY1k-UIZaVh1e5HVS180wSdQ5OWMBF0";
    

    const data = {
        origin: {
            location: {
                latLng: {
                    latitude: firstplace["lat"],
                    longitude: firstplace["lng"]
                }
            }
        },
        destination: {
            location: {
                latLng: {
                    latitude: finalplace["lat"],
                    longitude: finalplace["lng"]
                }
            }
        },
        intermediates: [waypoints],
        travelMode: "WALK",
        computeAlternativeRoutes: false,
        languageCode: "en-US",
        units: "METRIC",
    };

    const url = 'https://routes.googleapis.com/directions/v2:computeRoutes';
    const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
    };

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success on getpoly:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // Propagate the error
    });
}