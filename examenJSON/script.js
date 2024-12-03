window.onload = cargarContinentes;

let continente = document.getElementById("continente");

function cargarContinentes() {
    companies.forEach(compania => {
        let opcion = document.createElement("option");
        opcion.value = compania.continent;
        opcion.textContent = compania.continent;
        continente.appendChild(opcion);
    });

    cargarPaises();
}

function cargarPaises(continenteSeleccionado) {
    let tabla = document.getElementById("tablaBody");
    tabla.innerHTML = "";

    let continenteUsable = companies.find(compania => compania.continent === continenteSeleccionado);

    if (continenteUsable) {
        continenteUsable.countries.forEach(pais => {
            let fila = document.createElement("tr");
            let celda = document.createElement("td");
            celda.textContent = pais.name;
            fila.appendChild(celda);
            let clavesCompanias = pais.companies.map(compania => Object.keys(compania)[0]);
            let celdaNum = document.createElement("td");
            celdaNum.textContent = clavesCompanias.length;
            fila.appendChild(celdaNum);

            let celdaCompanias = document.createElement("td");
            celdaCompanias.textContent = clavesCompanias.join(", ");
            fila.appendChild(celdaCompanias);
            tabla.appendChild(fila);
        });
    } else {
        companies.forEach(continent => {
            continent.countries.forEach(pais => {
                let fila = document.createElement("tr");

                let celdaPais = document.createElement("td");
                celdaPais.textContent = pais.name;
                fila.appendChild(celdaPais);

                let clavesCompanias = pais.companies.map(compania => Object.keys(compania)[0]);

                let celdaNum = document.createElement("td");
                celdaNum.textContent = clavesCompanias.length;
                fila.appendChild(celdaNum);

                let celdaCompanias = document.createElement("td");
                celdaCompanias.textContent = clavesCompanias.join(", ");
                fila.appendChild(celdaCompanias);

                tabla.appendChild(fila);
            });
        });
    }
}

continente.addEventListener("change", (event) => {
    cargarPaises(event.target.value);
})