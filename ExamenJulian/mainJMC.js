window.onload = function () {
    cargarGeneros();
    cargarPaises();
    cargarAnios();
};

function cargarPaises() {
    const selectCountries = document.getElementById("selectCountries");

    let option = document.createElement("option");
    option.value = "todos";
    option.textContent = "All Countries";
    selectCountries.appendChild(option);

    countries.forEach(country => {
        option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        selectCountries.appendChild(option);
    });
}

function cargarGeneros() {
    const sitioCheckbox = document.getElementById("sitioCheckbox");

    const seleccionarTodos = document.createElement("input");
    seleccionarTodos.type = "checkbox";
    seleccionarTodos.id = "seleccionarTodos";
    seleccionarTodos.classList.add("form-check-input");
    const labelSeleccionarTodos = document.createElement("label");
    labelSeleccionarTodos.textContent = "All Genders";
    labelSeleccionarTodos.classList.add("form-check-label", "me-2");

    sitioCheckbox.appendChild(seleccionarTodos);
    sitioCheckbox.appendChild(labelSeleccionarTodos);

    genders.forEach(gender => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = gender.toLowerCase();
        checkbox.classList.add("form-check-input");
        const label = document.createElement("label");
        label.textContent = gender;
        label.classList.add("form-check-label", "me-2");

        sitioCheckbox.appendChild(checkbox);
        sitioCheckbox.appendChild(label);
    });

    seleccionarTodos.addEventListener("change", () => {
        const checkboxes = sitioCheckbox.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => {
            checkbox.checked = seleccionarTodos.checked;
        });
    });
}

function cargarAnios() {
    const anioInicio = 2000;
    const anioActual = new Date().getFullYear();
    const selectYearPrimero = document.getElementById("selectYearPrimero");
    const selectYearFinal = document.getElementById("selectYearFinal");

    function llenarSelect(select, desde, hasta, incluirVacio) {

        select.innerHTML = "";
        if (incluirVacio) {
            const vacio = document.createElement("option");
            vacio.value = "-";
            vacio.textContent = "-----";
            select.appendChild(vacio);
        }
        for (let anio = desde; anio <= hasta; anio++) {
            const opcion = document.createElement("option");
            opcion.value = anio;
            opcion.textContent = anio;
            select.appendChild(opcion);
        }
    }

    llenarSelect(selectYearPrimero, anioInicio, anioActual, true);
    llenarSelect(selectYearFinal, anioInicio, anioActual, true);

    selectYearPrimero.addEventListener("change", () => {
        const anioSeleccionado = parseInt(selectYearPrimero.value);
        if (!isNaN(anioSeleccionado)) {
            llenarSelect(selectYearFinal, anioSeleccionado, anioActual);
        } else {
            llenarSelect(selectYearFinal, anioInicio, anioActual, true);
        }
    });
}

function cargarPelis(event) {
    event.preventDefault();
    const sitioTarjetas = document.getElementById("tarjetas");
    sitioTarjetas.innerHTML = '';

    const texto = document.getElementById("titulo").value.trim().toLowerCase();

    if (!texto) {
        alert("Pon texto");
        return;
    }

    const paisSelected = document.getElementById("selectCountries").value;
    const generoSelected = Array.from(document.querySelectorAll("#sitioCheckbox input[type='checkbox']:checked"))
    .map(checkbox => checkbox.value.toLowerCase());
    const selectedYearStart = parseInt(document.getElementById("selectYearPrimero").value);
    const selectedYearEnd = parseInt(document.getElementById("selectYearFinal").value);

    const pelisFiltradas = pelis.filter(peli =>{

        const pais = paisSelected === "todos" || peli.Country.includes(paisSelected);
        const generos = generoSelected.length === 0 || generoSelected.some(g => peli.Genre.toLowerCase().includes(g));
        const year = (!isNaN(selectedYearStart) ? parseInt(peli.Year) >= selectedYearStart : true) &&
                            (!isNaN(selectedYearEnd) ? parseInt(peli.Year) <= selectedYearEnd : true);

    const textTitulo = document.getElementById("checkTitulo").checked ? peli.Title.toLowerCase().includes(texto) : true;
    const textDirector = document.getElementById("checkDirector").checked ? peli.Director.toLowerCase().includes(texto) : true;
    const textActor = document.getElementById("checkActors").checked ? peli.Actors.toLowerCase().includes(texto) : true;

    return pais && generos && year && textTitulo && textDirector && textActor;
    });

    pelisFiltradas.forEach(peli => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card');
        card.id = peli.Title;

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = peli.Title;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center');

        const img = document.createElement('img');
        img.src = peli.Images[0];
        img.classList.add('card-img-top');
        img.alt = peli.Title;

        const button = document.createElement('button');
        button.id = `button${peli.Title}`;
        button.textContent = 'Details';

        const badge = document.createElement('span');
        badge.classList.add('badge', 'bg-primary', 'rounded-pill', 'ms-3');
        badge.textContent = peli.Genre;

        const detallesDiv = document.createElement('div');
        detallesDiv.id = `detalles${peli.Title}`;

        cardBody.appendChild(img);
        cardBody.appendChild(button);
        cardBody.appendChild(badge);
        cardBody.appendChild(detallesDiv);
        card.appendChild(h5);
        card.appendChild(cardBody);
        col.appendChild(card);

        sitioTarjetas.appendChild(col);

        document.getElementById(`button${peli.Title}`).addEventListener("click", () => {
            cargarDetalles(peli);
            const card = document.getElementById(`${peli.Title}`);
            card.classList.add("bg-danger");
        });
    });

    if (pelisFiltradas.length === 0) {
        const noResults = document.createElement("p");
        noResults.textContent = "No movies found matching the selected criteria.";
        noResults.classList.add("text-center", "text-muted");
        sitioTarjetas.appendChild(noResults);
    }
}

document.getElementById("mostrar").addEventListener("click", cargarPelis);

function cargarDetalles(peli) {

    const botonDetalles = document.getElementById(`button${peli.Title}`);
    botonDetalles.disabled = true;

    const detallesTarjeta = document.getElementById(`detalles${peli.Title}`);

    detallesTarjeta.innerHTML = `
    <button id="cerrar${peli.Title}">X</button>
    <h6>IMDb Rating</h6>
        <label for="imdbInput${peli.Title}"> </label>
        <input type="text" id="imdbInput${peli.Title}" value="${peli.imdbRating || ''}">
        <button id="update${peli.Title}" class="btn btn-primary mt-2">Update</button>
    <pre>${JSON.stringify(peli, null, 2)} </pre>`;

    const updateButton = document.getElementById(`update${peli.Title}`);
    updateButton.addEventListener("click", () => {
        const nuevoRating = document.getElementById(`imdbInput${peli.Title}`).value;
        peli.imdbRating = nuevoRating;
        cargarDetalles(peli);
    });

    document.getElementById(`cerrar${peli.Title}`).addEventListener("click", () => {
        detallesTarjeta.innerHTML = ``;
        const card = document.getElementById(`${peli.Title}`);
        card.classList.remove("bg-danger");
        botonDetalles.disabled = false;
    });
}