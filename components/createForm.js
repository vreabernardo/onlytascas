import { createInput } from './createInput.js';
import { createButton } from './createButton.js';

const MAP_ENDPOINT = "makeMap";

export function createForm() {
    return new Promise((resolve, reject) => {
        // Create a form element
        const form = document.createElement('form');

        // Create an input element for food
        const foodInput = createInput('text', 'food', 'Enter a food');

        // Create an input element for location
        const locationInput = createInput('text', 'location', 'Enter a location');

        const radiusInput = createInput('text', 'radius', 'Radius (meters)');

        const numberOfPlaces = createInput('text', 'nplaces', 'Number of places');

        // Create a submit button
        const submitButton = createButton('submit', 'Submit');

        // Append the input elements and submit button to the form
        form.appendChild(foodInput);
        form.appendChild(locationInput);
        form.appendChild(numberOfPlaces);
        form.appendChild(radiusInput);
        form.appendChild(submitButton);

        // Add event listener to the form submit event
        form.addEventListener('submit', function(event) {
            handleFormSubmit(event, resolve, reject);
        });

        // Add the form to the document body
        document.body.appendChild(form);
    });
}

function handleFormSubmit(event, resolve, reject) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form); 

    const data = Object.fromEntries(formData.entries());

    if (data.food && data.location) {
        resolve(data);
    } else {
        reject('Please fill in both input fields');
    }
}
