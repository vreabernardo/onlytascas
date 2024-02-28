export function createItineraryTable(data) {
    const table = document.createElement('table');
    for (const key in data.places) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = data.places[key].displayName.text;
        cell2.textContent = data.places[key].location.latitude;
        cell3.textContent = data.places[key].location.longitude;
    }
    const formElement = document.querySelector('form');
    formElement.replaceWith(table);

    const reloadButton = document.createElement('button');
    reloadButton.textContent = 'New Rali?';
    reloadButton.addEventListener('click', () => {
        location.reload();
    });
    document.body.appendChild(reloadButton);

    return table;
}
