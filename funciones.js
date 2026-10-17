
const campoTexto = document.querySelector('.campoTexto');
const botonAgregar = document.querySelector('.boton');
const tablaBody = document.querySelector('.table tbody');
const formulario = document.querySelector('form');

// Arreglo principal para almacenar las tareas
let tareas = [];


let indiceEdicion = -1;

// 1. 
document.addEventListener('DOMContentLoaded', () => {
    const tareasGuardadas = localStorage.getItem('mis_tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
    }
    renderizarTareas();
});

// Función para Agregar o Actualizar la tarea
function guardarTarea(e) {
    if (e) e.preventDefault(); 

    const texto = campoTexto.value.trim();

    // Validación de campo vacio
    if (texto === '') {
        alert('Debes agregar una tarea');
        return;
    }

    if (indiceEdicion === -1) {
        // Crear
        tareas.push(texto);
    } else {
        // Actualizar
        tareas[indiceEdicion] = texto;
        indiceEdicion = -1;
        botonAgregar.textContent = 'Agregar';
    }

    campoTexto.value = '';
    guardarEnLocalStorage();
    renderizarTareas();
}

// 2. Guardar eventos
botonAgregar.addEventListener('click', guardarTarea);

campoTexto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        guardarTarea();
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarTarea();
});

// 3. Leer y mostrar las tareas en las tablas.
function renderizarTareas() {
    tablaBody.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td style="width: 90%;">${tarea}</td>
            <td><span style="cursor: pointer;" onclick="prepararEdicion(${index})">📝</span></td>
            <td><span style="cursor: pointer;" onclick="eliminarTarea(${index})">❌</span></td>
        `;

        tablaBody.appendChild(tr);
    });
}

// 4. Edición (Peparación de campo)
function prepararEdicion(index) {
    campoTexto.value = tareas[index];
    indiceEdicion = index;
    botonAgregar.textContent = 'Guardar';
    campoTexto.focus();
}

// 5. Eliminar 
function eliminarTarea(index) {
    if (confirm('¿Deseas eliminar esta tarea?')) {
        tareas.splice(index, 1);

        
        if (indiceEdicion === index) {
            indiceEdicion = -1;
            campoTexto.value = '';
            botonAgregar.textContent = 'Agregar';
        }

        guardarEnLocalStorage();
        renderizarTareas();
    }
}

// Función para evitar que se eliminen las tareas cuando se recarga la pagina.
function guardarEnLocalStorage() {
    localStorage.setItem('mis_tareas', JSON.stringify(tareas));
}