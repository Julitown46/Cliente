window.onload = ordenComunidades(true, true);

function ordenComunidades(orden, orden2) {
    let acordion = document.getElementById("accordionComunidades");
    acordion.innerHTML = '';
    let comunidadesOrdenadas;
    if(orden){
     comunidadesOrdenadas = comunidades.sort((a, b) => a.label.localeCompare(b.label));
    } else {
        comunidadesOrdenadas = comunidades.sort((a, b) => {
            let totalCiudadesA = a.provinces.reduce((sum, provincia) => sum + provincia.towns.length, 0);
            let totalCiudadesB = b.provinces.reduce((sum, provincia) => sum + provincia.towns.length, 0);
            return totalCiudadesB - totalCiudadesA;
        });
    }
    if (!orden2) {
        comunidadesOrdenadas = comunidadesOrdenadas.reverse();
    }

    comunidadesOrdenadas.forEach(comunidad => {
        acordion.innerHTML += `<div class="accordion-item">
                <h2 class="accordion-header" id="header${comunidad.label}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse${comunidad.label}" aria-expanded="false" aria-controls="collapse${comunidad.label}">
                        ${comunidad.label} - ${comunidad.provinces.length} provinces
                    </button>
                </h2>
                <div id="collapse${comunidad.label}" class="accordion-collapse collapse show" aria-labelledby="headerAndalucia"
                    data-bs-parent="#accordionComunidades">
                    <div class="accordion-body">
                        <div class="accordion sub-accordion" id="accordion${comunidad.label}">
                            
                        </div>
                    </div>
                </div>
            </div>`;

        let subAcordion = document.getElementById(`accordion${comunidad.label}`);
        let provinciasOrdenadas;

        if(orden){
            provinciasOrdenadas = comunidad.provinces.sort((a, b) => a.label.localeCompare(b.label));
        } else {
            provinciasOrdenadas = comunidad.provinces.sort((a, b) => b.towns.length - a.towns.length);
        }

        if (!orden2) {
            provinciasOrdenadas = provinciasOrdenadas.reverse();
        }

        provinciasOrdenadas.forEach(provincia => {
            subAcordion.innerHTML += `<div class="accordion-item">
                    <h2 class="accordion-header" id="header${provincia.label}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${provincia.label}" aria-expanded="false" aria-controls="collapse${provincia}">
                            ${provincia.label}
                            <span class="badge bg-primary rounded-pill ms-3">${provincia.towns.length}</span>
                        </button>
                    </h2>
                    <div id="collapse${provincia.label}" class="accordion-collapse collapse" aria-labelledby="header${provincia}"
                        data-bs-parent="#accordion${comunidad.label}">
                        <div class="accordion-body" id="ciudades${provincia.label}">
                            
                        </div>
                    </div>
                </div>`;

            let ciudades = document.getElementById(`ciudades${provincia.label}`);
            let lista = document.createElement("ul");
            provincia.towns.forEach(ciudad => {
                let item = document.createElement("li");
                item.textContent = ciudad.label;
                lista.appendChild(item);
            });
            ciudades.appendChild(lista);
        });
    });
}

document.getElementById("orden").addEventListener("change", (event) => {
    let seleccion = event.target.value;
    let orden = true;
    let orden2 = true;

    if (seleccion === "alfabetico") {
        ordenComunidades(orden, orden2);
    } else if (seleccion === "alfabetico2") {
        orden2 = false;
        ordenComunidades(orden, orden2);
    } else if (seleccion === "numeroCiudades") {
        orden = false;
        ordenComunidades(orden, orden2);
    } else if (seleccion === "numeroCiudades2") {
        orden = false;
        orden2 = false;
        ordenComunidades(orden, orden2);
    }
});