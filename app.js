import { createForm } from './components/createForm.js';
import { postData } from './postData.js';
import { createItineraryTable } from './components/createItineraryTable.js';
import { initMap } from './components/createMapRoute.js';

const url = 'http://127.0.0.1:5000/makeMap';
const API_KEY = "GOOGLEAPIKEY";

function main() {
    // initialize the library from google maps
    const script = document.createElement('script');
    script.src = `http://maps.google.com/maps/api/js?libraries=geometry&key=${API_KEY}`;
    document.body.appendChild(script);
                          
    createForm()
        .then(formData => {
            postData(url, formData)
                .then(response => {
                    console.log('Response from server:', response);
                    
                    // Create a table with the response data
                    createItineraryTable(response)

                    // Create a map element
                    let map = document.createElement("div");
                    map.id = "map";
                    document.body.appendChild(map);


                    // Create a map with the response data
                    initMap(response, API_KEY);
                })
                .catch(error => {
                    // error posting data to server
                    console.error(error);
                });
        })
        .catch(error => {
            // error handling form submission
            console.error(error);
        });
}

main();
