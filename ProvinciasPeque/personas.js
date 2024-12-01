let contPersonas = 0;

function crearPersona() {
    let nuevoDiv = document.createElement('div');
    nuevoDiv.setAttribute('id', 'persona'+ contPersonas);
    document.getElementById("personas").appendChild(nuevoDiv);

    let crear = document.getElementById("persona" + contPersonas);
    crear.innerHTML += `
    <fieldset>
    <h2>${contPersonas + 1}ª Persona autorizada: </h2>
    <label for="nombre">Nombre: </label>
    <input type="text" class="nombre" name="nombre" required><br><br>

    <label for="primerApellido">Primer apellido: </label>
    <input type="text" class="primerApellido" name="primerApellido" required><br><br>

    <label for="segundoApellido">Segundo apellido: </label>
    <input type="text" class="segundoApellido" name="segundoApellido"><br><br>

    <label for="select">Tipo de documentacion: </label>
    <select name="tipo" class="tipo">
        <option value="" disabled selected>Tipo de documentacion</option>
        <option value="nif">NIF</option>
        <option value="nie">NIE</option>
        <option value="pasaporte">Pasaporte</option>
    </select><br><br>

    <label for="idNum">NIF/NIE/Pasaporte: </label>
    <input type="text" class="docu"><br><br>

    <label for="telefono">Teléfono: </label>
    <input type="number" class="telefono"><br><br>
    </fieldset>
`;

    contPersonas++;
}

crearPersona();

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('aniadir')) {
        event.preventDefault();

        if (contPersonas < 5) {
            crearPersona();
            let resultado = document.getElementById('resultado');
            resultado.innerHTML = '';
        } else {
            alert("Máximo de personas permitidas");
        }
    }

    if (event.target.classList.contains('borrar')) {
        event.preventDefault();

        if (contPersonas > 0) {
            contPersonas--;
            let personaDiv = document.getElementById("persona" + contPersonas);
            personaDiv.innerHTML = '';
            let resultado = document.getElementById('resultado');
            resultado.innerHTML = '';
        }
    }
});

document.getElementById('mostrarDatos').addEventListener('click', () => {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    for (let i = 0; i < contPersonas; i++) {
        let personaDiv = document.getElementById("persona" + i);
        let nombre = personaDiv.querySelector('.nombre').value;
        let primerApellido = personaDiv.querySelector('.primerApellido').value;
        let segundoApellido = personaDiv.querySelector('.segundoApellido').value;
        let tipoDoc = personaDiv.querySelector('.tipo').value;
        let documento = personaDiv.querySelector('.docu').value;
        let telefono = personaDiv.querySelector('.telefono').value;

        resultado.innerHTML += `
            <h3>Persona ${i + 1}:</h3>
            <p>Nombre: ${nombre}</p>
            <p>Primer Apellido: ${primerApellido}</p>
            <p>Segundo Apellido: ${segundoApellido}</p>
            <p>Tipo de Documentación: ${tipoDoc}</p>
            <p>NIF/NIE/Pasaporte: ${documento}</p>
            <p>Teléfono: ${telefono}</p>
            <hr>
        `;
    }
});

document.getElementById("preferences").addEventListener("input", (event) =>{
    if(event.target.value === "negro"){
        let estiloNuevo = document.querySelector("link.estilo");
        estiloNuevo.href = "negro.css";
    } else if(event.target.value === "blanco"){
        let estiloNuevo = document.querySelector("link.estilo");
        estiloNuevo.href = "blanco.css";
    }
});