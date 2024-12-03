window.onload = cargarTabla;

function cargarTabla() {
    let tabla = document.getElementById("tablaBody");
    for (let libro of libros) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", `${libro.titulo}`);
        Object.values(libro).forEach(value => {
            let td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    }
}

function nombreGeneros() {
    let generos = [];

    libros.forEach(libro => {
        libro.genero.forEach(g => {
            if (!generos.includes(g)) {
                generos.push(g);
            }
        });
    });

    let parrafo = document.getElementById("uno");
    let p = document.createElement("p");
    p.textContent = `El nombre de generos es: ${generos}.`;
    parrafo.appendChild(p);
}

document.getElementById("p1").addEventListener("click", () => {
    let parrafo = document.getElementById("uno");
    parrafo.innerHTML = ``;
    nombreGeneros();
});

document.getElementById("h1").addEventListener("click", () => {
    let parrafo = document.getElementById("uno");
    parrafo.innerHTML = ``;
});


function masDe300() {
    let mas300 = libros.filter(l => l.pags > 300);
    let fila;

    let parrafo = document.getElementById("dos");
    let p = document.createElement("p");
    p.textContent = "Los libros con mas de 300 paginas son: ";
    mas300.forEach(libro => {
        p.textContent += libro.titulo + " | ";
        parrafo.appendChild(p);
        fila = document.getElementById(`${libro.titulo}`);
        fila.classList.add("table-danger");
    });
}

document.getElementById("p2").addEventListener("click", () => {
    let parrafo = document.getElementById("dos");
    parrafo.innerHTML = ``;
    masDe300();
});

document.getElementById("h2").addEventListener("click", () => {
    let parrafo = document.getElementById("dos");
    parrafo.innerHTML = ``;
    let filas = document.querySelectorAll(".table-danger");
    filas.forEach(fila => {
        fila.classList.remove("table-danger");
    });
});

function masDe2anos() {
    let mas2 = libros.filter(l => l.fecha < "2022");
    let fila;

    let parrafo = document.getElementById("tres");
    let p = document.createElement("p");
    p.textContent = "Los libros con mas de 2 anos son: ";
    mas2.forEach(libro => {
        p.textContent += libro.titulo + " | ";
        parrafo.appendChild(p);
        fila = document.getElementById(`${libro.titulo}`);
        fila.classList.add("table-success");
    });
}

document.getElementById("p3").addEventListener("click", () => {
    let parrafo = document.getElementById("tres");
    parrafo.innerHTML = ``;
    masDe2anos();
});

document.getElementById("h3").addEventListener("click", () => {
    let parrafo = document.getElementById("tres");
    parrafo.innerHTML = ``;
    let filas = document.querySelectorAll(".table-success");
    filas.forEach(fila => {
        fila.classList.remove("table-success");
    });
});

function nombreAutores() {
    let autores = [];

    libros.forEach(libro => {
        libro.autor.forEach(a => {
            if (!autores.includes(a)) {
                autores.push(a);
            }
        });
    });

    let parrafo = document.getElementById("cuatro");
    let sum;

    autores.forEach(autor => {
        sum = 0;
        libros.forEach(libro => {
            if (libro.autor.includes(autor)) {
                sum++;
            }
        });
        let p = document.createElement("p");
        p.textContent = `El autor ${autor} tiene ${sum} libros.`;
        parrafo.appendChild(p);
    });
}

document.getElementById("p4").addEventListener("click", () => {
    let parrafo = document.getElementById("cuatro");
    parrafo.innerHTML = ``;
    nombreAutores();
});

document.getElementById("h4").addEventListener("click", () => {
    let parrafo = document.getElementById("cuatro");
    parrafo.innerHTML = ``;
});

function librosLeidos() {
    let parrafo = document.getElementById("cinco");
    parrafo.innerHTML = ``;
    let leidos = [];

    libros.forEach(libro => {
        if (libro.leido) {
            leidos.push(libro);
        }
    });

    leidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    leidos.forEach(libro => {
        let p = document.createElement("p");
        p.textContent = `Título: ${libro.titulo}, Fecha: ${libro.fecha}`;
        parrafo.appendChild(p);
    });
}

document.getElementById("p5").addEventListener("click", librosLeidos);

document.getElementById("h5").addEventListener("click", () => {
    let parrafo = document.getElementById("cinco");
    parrafo.innerHTML = ``;
});