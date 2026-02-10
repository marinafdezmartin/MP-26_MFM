// Guardar boton en variable

const boton = document.getElementById('boton')

// Le doy la capacidad al boton de escuchar

boton.addEventListener('click', botonHandler)

// function "nombre de la funcion" ("grito"){
// codigo
// }

function botonHandler (eventoClick) {
    console.log(eventoClick)
}

// INPUT-TEXTO

const inputTexto = document.getElementById('input-texto')

inputTexto.addEventListener('change', inputTextoHandler)

function inputTextoHandler (eventoChange) {
    console.log(eventoChange)
    // Si pones algun atributo del evento que aparece en la consola:
    console.log(eventoChange.target.value)
    // Se puede guardar en una variable
    const textoUsuario = eventoChange.target.value
    // Hacemos que el input aparezca en un parrafo
    const parrafoNuevo = document.createElement('p')
    parrafoNuevo.innerHTML = textoUsuario
    document.body.appendChild(parrafoNuevo)
}