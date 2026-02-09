// Crea una funcion que acepte una palabra y calcule su numero de vocales


function cuentaVocales(palabra) {
    const palabraMinuscula = palabra.toLowerCase()
    const arrayLetras = palabraMinuscula.split('')
    let contador = 0

    arrayLetras.map((letra) => {
        if (letra === 'a' || letra === 'e' || letra === 'i' || letra === 'o' || letra === 'u') {
            contador++
        }
    })

    return contador
}

console.log(cuentaVocales('Hola Mundo'))