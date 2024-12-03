window.onload = cargarContinentes;

let continente = document.getElementById("continente");

function cargarContinentes(){
    companies.forEach( compania => {
        let opcion = document.createElement("option");
        opcion.value = compania.continent;
        opcion.textContent = compania.continent;
        continente.appendChild(opcion);
    });
}

function cargarPaises(continenteSeleccionado){
    let tabla = document.getElementById("tablaBody");
    tabla.innerHTML = "";

    let continenteUsable = companies.find(compania => compania.continent === continenteSeleccionado);

    if (continenteUsable) {
        continenteUsable.countries.forEach(pais => {
            let fila = document.createElement("tr");
            let celda = document.createElement("td");
            celda.textContent = pais.name; 
            fila.appendChild(celda);
            tabla.appendChild(fila);
        });
    } else {
        companies.forEach(continent => {
            continent.countries.forEach(pais => {
            let fila = document.createElement("tr");
            let celda = document.createElement("td");
            celda.textContent = pais.name; 
            fila.appendChild(celda);
            tabla.appendChild(fila);
            });
        });
    }
}

continente.addEventListener("change", (event) =>{
    cargarPaises(event.target.value);
})