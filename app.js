import { createForm } from './components/createForm.js';
import { postData } from './postData.js';

/*
FORM -> SEND DATA TO SERVER -> GET RESPONSE -> DISPLAY RESPONSE
*/

let dataFromServer;
const url = 'http://127.0.0.1:5000/makeMap'

function main() {

    createForm()
        .then(formData => {
            dataFromServer = formData;
            
            postData(url, dataFromServer)
                .then(response => {
                    console.log('Response from server:', response);
                     
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