export function createItineraryTable(data) {
    const table = document.createElement('table');
    for (const key in data) {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = data[key][1];
        cell2.innerHTML = `<button class="placeButton" onclick="window.open('${data[key][2]}')">Go</button>`;
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
