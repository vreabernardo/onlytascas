// Purpose: create a table with the itinerary data and replace the form with it

export function createItineraryTable(data) {
    // Create a table with the response data
    const table = document.createElement('table');
    for (const key in data) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = data[key][1];
        cell2.innerHTML = `<button class="placeButton" onclick="window.open('${data[key][2]}')">Go</button>`;
    }

    // Replace the form with the table
    const formElement = document.querySelector('form');
    formElement.replaceWith(table);

    // Add a button to reload the page
    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'New Rali?';
    reloadButton.addEventListener('click', () => {
        location.reload();
    });
    
    // Add the button to the body
    document.body.appendChild(reloadButton);

    return table;
}
