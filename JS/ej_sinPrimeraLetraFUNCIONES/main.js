// Crea una funcion que concatene dos cadenas excepto su primer carácter

const arrayUno = ['lunes', 'martes', 'miercoles']
const arrayDos = ['jueves', 'viernes', 'sabado', 'domingo']

function concatArraysSinPrimerElemento(array1, array2) {
    return array1.slice(1).concat(array2.slice(1));
}

console.log(concatArraysSinPrimerElemento(arrayUno, arrayDos))
console.log(concatArraysSinPrimerElemento('Hola', 'Mundo'))
