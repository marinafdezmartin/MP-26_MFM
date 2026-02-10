// Seleccionar botones

const botonCalcular = document.getElementById('boton-calcular')
const botonReiniciar = document.getElementById('boton-reiniciar')
const inputTexto = document.getElementById('input-texto')
const botonEjemplo = document.getElementById('boton-cargar')

// Crear parrafos (fuera para luego utilizarlos en otro boton)
const parrafoNuevoSuma = document.createElement('p')
const parrafoNuevoMedia = document.createElement('p')
const ejemplo = ['23', '5', '46', '82']

// BOTÓN CALCULAR

function botonCalcularHandler(eventoClick) {

    // Paso 1: Recoger la información del input
    console.log(inputTexto.value)
    const textoNumeros = inputTexto.value

    // Paso 2: Transformar a Array de números
    const arrayTexto = textoNumeros.split(',')
    console.log(arrayTexto)
    const arrayNumeros = arrayTexto.map(function (numeroTexto){
        return Number(numeroTexto)
    })
    console.log(arrayNumeros)

    // Paso 3: Operaciones
        // Suma
    let suma = 0;
    arrayNumeros.map(function (numero) {
        suma = suma + numero
    })
    console.log(suma)

        // MEDIA
    const media = suma / arrayNumeros.length
    console.log(media)

        // Valor maximo y minimo
    const valoresOrdenados = arrayNumeros.sort()
    const valorMin = valoresOrdenados[0]
    const valorMax = valoresOrdenados[valoresOrdenados.length -1]
    console.log(valorMin)
    console.log(valorMax)

    // Añadir informacion a los nuevos parrafos 
    // const parrafoNuevoSuma = document.createElement('p')
    parrafoNuevoSuma.innerHTML = `La suma es ${suma}`
    document.body.appendChild(parrafoNuevoSuma)

    // const parrafoNuevoMedia = document.createElement('p')
    parrafoNuevoMedia.innerHTML = `La media es ${media}`
    document.body.appendChild(parrafoNuevoMedia)
}

botonCalcular.addEventListener('click', botonCalcularHandler)

// BOTÓN REINICIAR

function botonReiniciarHandler(eventoClick) {
    inputTexto.value = ''
    parrafoNuevoMedia.innerHTML = ''
    parrafoNuevoSuma.innerHTML = ''
}

botonReiniciar.addEventListener('click', botonReiniciarHandler)

// BOTÓN CARGAR EJEMPLO
function botonEjemploHandler (eventoClick) {
    inputTexto.value = ejemplo
}

botonEjemplo.addEventListener('click', botonEjemploHandler)

