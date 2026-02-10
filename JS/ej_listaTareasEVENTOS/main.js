const inputTexto = document.getElementById('input-texto')
const botonAgregar = document.getElementById('boton-agregar')

const listaTareas = document.getElementById('lista-tareas')
const nuevoLi = document.createElement('li')

const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

function agregarTareasHandler (eventoClick) {
    const tarea = inputTexto.value
    
    nuevoLi.textContent = tarea
    listaTareas.appendChild(nuevoLi)

    inputTexto.value = ''
}

botonAgregar.addEventListener('click', agregarTareasHandler)