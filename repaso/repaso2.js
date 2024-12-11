const person = {
    "nombre": "Noon",
    "edad": 6,
    "aficiones": ["Deporte", "Lectura", "Viajar"],
    "emancipado": true
}

const person2 = {
    "nombre": "Siis",
    "edad": 16,
    "aficiones": ["Futbol", "Cine", "Andar"],
    "emancipado": false
}

window.onload = crearFormulario(person);

function crearFormulario(object) {
    const formulario = document.getElementById("formulario");

    for (const [key, value] of Object.entries(object)) {
        const label = document.createElement("label");
        label.textContent = `${key}: `;
        formulario.appendChild(label);

        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            const input = document.createElement("input");
            input.value = value;
            if (typeof value === "boolean") {
                input.checked = value;
                input.type = "checkbox";
                input.addEventListener("change", () => {
                    input.checked = value;
                });
            } else {
                input.type = typeof value;
            }
            formulario.appendChild(input);
        } else if (Array.isArray(value)) {
            const select = document.createElement("select");
            value.forEach(opcionValue => {
                const opcion = document.createElement("option");
                opcion.value = opcionValue;
                opcion.textContent = opcionValue;
                select.appendChild(opcion);
            });
            formulario.appendChild(select);
        }
    }
}