import { createForm } from './components/createForm.js';
import { postData } from './postData.js';
import { createItineraryTable } from './components/createItineraryTable.js';
import { initMap} from './components/createMapRoute.js';


let dataFromServer;
const url = 'http://127.0.0.1:5000/makeMap';

function main() {
    createForm()
        .then(formData => {
            dataFromServer = formData;
            postData(url, dataFromServer)
                .then(response => {
                    console.log('Response from server:', response);
                    const formElement = document.querySelector('form');
                    formElement.replaceWith(createItineraryTable(response))
                    
                    let map = document.createElement("div");
                    map.id = "map";
                    document.body.appendChild(map);

                    initMap(response);
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
}

main();
