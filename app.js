import { createForm } from './components/createForm.js';
import { postData } from './postData.js';
import { createItineraryTable } from './components/createItineraryTable.js';
import { initMap } from './components/createMapRoute.js';

const url = 'http://127.0.0.1:5000/makeMap';

function main() {
    createForm()
        .then(formData => {
            postData(url, formData)
                .then(response => {
                    console.log('Response from server:', response);
                    // Replace the form with the itinerary table
                    const formElement = document.querySelector('form');
                    formElement.replaceWith(createItineraryTable(response))
                    
                    // Create a map element
                    let map = document.createElement("div");
                    map.id = "map";
                    document.body.appendChild(map);

                    // Create a map with the response data
                    initMap(response);
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
