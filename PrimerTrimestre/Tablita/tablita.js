let tabla = document.getElementById("tabla");

tabla.addEventListener("click", (event) => {
    let celda = event.target;

    if (celda.tagName === "TD" || celda.tagName === "TH") {
        let fila = celda.parentNode.rowIndex;
        let columna = celda.cellIndex;
        let color;

        if (event.ctrlKey) {
            color = "red";
        } else if (event.shiftKey) {
            color = "blue";
        } else {
            color = "green";
        }

        Array.from(tabla.getElementsByTagName("td")).forEach(cell => {
            cell.classList.remove("red", "green", "blue");
        });

        Array.from(tabla.getElementsByTagName("th")).forEach(cell => {
            cell.classList.remove("red", "green", "blue");
        });

        Array.from(tabla.rows[fila].cells).forEach(cell => {
            cell.classList.add(color);
        })

        for (let i = 0; i < tabla.rows.length; i++) {
            tabla.rows[i].cells[columna].classList.add(color);
        }

        console.log(`Fila: ${fila}, Columna: ${columna}`);

        let objeto = {
            tag: celda.tagName,
            id: celda.id || "No ID",
            textContent: celda.textContent,
            filaTextContent: Array.from(tabla.rows[fila].cells).map(cell => cell.textContent),
            columnaTextContent: Array.from(tabla.rows).map(row => row.cells[columna].textContent)
        };

        document.getElementById("info").innerHTML = `<p>TAG: ${objeto.tag}</p>
                                                     <p>ID: ${objeto.id}</p>
                                                     <p>TextContent: ${objeto.textContent}</p>
                                                     <p>FilaContenido: ${objeto.filaTextContent}</p>
                                                     <p>ColumnaContenido: ${objeto.columnaTextContent}</p>`;
    } else {
        console.log("clika otra cosa");

    }
});

