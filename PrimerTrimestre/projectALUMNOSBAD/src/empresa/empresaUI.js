import { crearEmpresa, obtenerEmpresas, eliminarEmpresa } from './empresaController.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-alta-empresa');
    const tablaEmpresas = document.getElementById('tabla-empresas').querySelector('tbody');
    let editando = false; // edito o no
    let empresaIdEditar = null; // Id del que voy a editar

    // Función para renderizar la tabla
    const renderTablaEmpresas = () => {
        const empresas = obtenerEmpresas();
        console.log(empresas);

        tablaEmpresas.innerHTML = '';
        empresas.forEach(empresa => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${empresa.id}</td>
                <td>${empresa.nombre}</td>
                <td>${empresa.direccion}</td>
                 <td>
                    <button class="editar" data-id="${empresa.id}">Editar</button>
                    <button class="eliminar" data-id="${empresa.id}">Eliminar</button>
                </td>
            `;
            tablaEmpresas.appendChild(fila);
        });
    };

 // Delegación de eventos para editar y eliminar
 tablaEmpresas.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('editar')) {
        const empresaId = target.dataset.id;
        alert(`Editar empresa con ID: ${empresaId}`);
        const empresas = obtenerEmpresas();
        const empresa = empresas.find(e => e.id === parseInt(empresaId));

        if (empresa) {
            form.nombre.value = empresa.nombre;
            form.direccion.value = empresa.direccion;
            form.querySelector('button').textContent = 'Editar Empresa';
            editando = true;
            empresaIdEditar = parseInt(empresaId);
        }
    } else if (target.classList.contains('eliminar')) {
        const empresaId = target.dataset.id;
        alert(`Eliminar empresa con ID: ${empresaId}`);
        eliminarEmpresa(empresaId);
        renderTablaEmpresas(); // Recargar la tabla después de eliminar
    }
});

// Manejo del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = form.nombre.value;
    const direccion = form.direccion.value;

    if (editando) {
        // Actualizar la empresa existente
        const empresas = obtenerEmpresas();
        const empresa = empresas.find(e => e.id === empresaIdEditar);

        if (empresa) {
            empresa.nombre = nombre;
            empresa.direccion = direccion;
        }

        // Reiniciar el modo de edición
        editando = false;
        empresaIdEditar = null;
        form.querySelector('button').textContent = 'Crear Empresa';
    } else {
        // Crear una nueva empresa
        crearEmpresa(nombre, direccion);
    }

    renderTablaEmpresas();

    // Limpiar el formulario
    form.reset();
});

// Cargar la tabla inicialmente
renderTablaEmpresas();
});
