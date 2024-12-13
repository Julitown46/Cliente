window.onload = crearCartas;

function crearCartas() {
    products.forEach(product => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = document.createElement('div');
        card.classList.add('card');
        card.id = product.nombre;

        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.textContent = product.nombre;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center');

        const img = document.createElement('img');
        img.src = product.imagen;
        img.classList.add('card-img-top');
        img.style.width = "200px"
        img.alt = product.nombre;

        const button = document.createElement('button');
        button.id = `button${product.nombre}`;
        button.textContent = 'Comprar';

        const input = document.createElement('input');
        input.id = `cantidad${product.nombre}`
        input.type = 'number';
        if (product.stock === 0) {
            input.value = 1;
        } else {
            input.value = product.stock;
        }

        const p = document.createElement('p');
        p.textContent = `Precio: ${product.precio}€`;
        if (product.stock === 0) {
            p.textContent += ` - sin Stock`;
        } else if (product.stock <= 4) {
            p.textContent += ` - Quedan ${product.stock}`;
        }


        cardBody.appendChild(img);
        cardBody.appendChild(p);
        cardBody.appendChild(input);
        cardBody.appendChild(button);
        card.appendChild(h5);
        card.appendChild(cardBody);
        col.appendChild(card);

        document.getElementById("productos").appendChild(col);

        document.getElementById(`button${product.nombre}`).addEventListener("click", () => {
            crearElementoCarrito(product, input.value);
        });

    })
}

function crearElementoCarrito(product, numProd) {
    const tbody = document.getElementById("tbody");
    let totalDelTotal = 0;
    totalDelTotal += product.precio * numProd;

    tbody.innerHTML += `<tr id="tr${product.nombre}">
                <td>
                    <button id="${product.nombre}add">+</button>
                    <p id="${product.nombre}cant">${numProd}</p>
                    <button id="${product.nombre}remove">-</button>
                </td>
                <td>${product.nombre}</td>
                <td>${product.precio}€</td>
                <td>${product.precio * numProd}€</td>
                <td><button id="eliminar${product.nombre}">Eliminar</button></td>
            </tr>`;
            
    document.getElementById(`tr${product.nombre}`).addEventListener("mouseenter", () => {
        document.getElementById(`tr${product.nombre}`).classList.add("table-secondary");
    });

    document.getElementById(`tr${product.nombre}`).addEventListener("mouseleave", () => {
        document.getElementById(`tr${product.nombre}`).classList.remove("table-secondary");
    });

    document.getElementById(`${product.nombre}add`).addEventListener("click", () => {
        document.getElementById(`${product.nombre}cant`).textContent = numProd++;
    });

    document.getElementById(`${product.nombre}remove`).addEventListener("click", () => {
        document.getElementById(`${product.nombre}cant`).textContent = numProd--;
    });

    document.getElementById(`eliminar${product.nombre}`).addEventListener("click", () => {
        const tbody = document.getElementById("tbody");
        tbody.removeChild(document.getElementById(`tr${product.nombre}`));
    });

    tbody.addEventListener("change", () => {
        document.getElementById("total").value = `Total: ${totalDelTotal}`;
    });
}