// Purpose: Create input element with given type, name and placeholder.
export function createInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
}