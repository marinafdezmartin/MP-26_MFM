const numero = 7

const inputNumero = document.getElementById('input-numero')
const botonPrueba = document.getElementById('boton-prueba')

const parrafoNuevoBajo = document.createElement('p')
const parrafoNuevoAlto = document.createElement('p')
const parrafoNuevoAcierto = document.createElement('p')

// Boton

function botonProbarHandler(eventoClick) {

    if (inputNumero.value == numero) {
        parrafoNuevoAcierto.innerHTML = `¡¡¡Correcto!!!`
        document.body.appendChild(parrafoNuevoAcierto)
    } else if (inputNumero.value < numero) {
        parrafoNuevoBajo.innerHTML = `Demasiado bajo`
        document.body.appendChild(parrafoNuevoBajo)
    } else {
        parrafoNuevoAlto.innerHTML = `Demasiado alto`
        document.body.appendChild(parrafoNuevoAlto)
    }
}

botonPrueba.addEventListener('click', botonProbarHandler)