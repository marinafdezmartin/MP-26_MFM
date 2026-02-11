// BOTONES CARRUSEL

const btnIzq = document.getElementById('btn-izq')
const btnDcha = document.getElementById('btn-dcha')
const track = document.querySelector('.track')

// Click boton izquierda

function desplazarIzquierdaHandler (eventoClick) {
    // Devuelve el ancho visible de track
    const cardWidth = track.clientWidth;
    track.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
    })
}

// Click boton derecha

function desplazarDerechaHandler (eventoClick) {
    const cardWidth = track.clientWidth;
    track.scrollBy({
        left: cardWidth,
        behavior:'smooth'
    })

}

// Activar botones

btnIzq.addEventListener('click', desplazarIzquierdaHandler)
btnDcha.addEventListener('click', desplazarDerechaHandler)