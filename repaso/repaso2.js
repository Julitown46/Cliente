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

const nombreDiv = document.getElementById("nombre");
const edadDiv = document.getElementById("edad");
const aficionesDiv = document.getElementById("aficiones");
const emancipadoDiv = document.getElementById("emancipado");

window.onload = crearFormulario(person2);

function crearFormulario(objeto) {

    const nombreLabel = document.createElement("label");
    nombreLabel.textContent = "Nombre:";
    let inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.value = Object.values(objeto)[0];
    nombreDiv.appendChild(nombreLabel);
    nombreDiv.appendChild(inputNombre);

    const edadLabel = document.createElement("label");
    edadLabel.textContent = "Edad:";
    let edadInput = document.createElement("input");
    edadInput.type = "number";
    edadInput.value = Object.values(objeto)[1];
    edadDiv.appendChild(edadLabel);
    edadDiv.appendChild(edadInput);

    const aficionesLabel = document.createElement("label");
    aficionesLabel.textContent = "Aficiones: ";
    aficionesDiv.appendChild(aficionesLabel);
    Object.values(objeto)[2].forEach(aficion => {
        let aficionInput = document.createElement("button");
        aficionInput.textContent = aficion;
        aficionInput.value = aficion;
        aficionesDiv.appendChild(aficionInput);
    });

    const emancipadoLabel = document.createElement("label");
    emancipadoLabel.textContent = "Emancipado: ";
    const empancipadoInput = document.createElement("input");
    empancipadoInput.type = "checkbox";
    empancipadoInput.value = Object.values(objeto)[3];
    if (Object.values(objeto)[3]) {
        empancipadoInput.checked = true;
        empancipadoInput.addEventListener("change", () => { empancipadoInput.checked = true; });
    } else {
        empancipadoInput.checked = false;
        empancipadoInput.addEventListener("change", () => { empancipadoInput.checked = false; });
    }

    emancipadoDiv.appendChild(emancipadoLabel);
    emancipadoDiv.appendChild(empancipadoInput);
}