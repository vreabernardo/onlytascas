// Purpose: create a button element with the given type and textContent.

export function createButton(type, textContent) {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = textContent;
    return button;
}