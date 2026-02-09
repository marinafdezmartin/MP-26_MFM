// FUNCIONES

function holaMundo() {
    console.log('Hola Mundo')
    return 'Hola Mundo'
}

// Puedes coger las salidas de las funciones y meterlas en variables = guardar y usar
const salidaFuncion = holaMundo()

console.log(salidaFuncion)

// SUMAR 2 numeros

function sumarNumeros(numero1, numero2) {
    const suma = numero1 + numero2
    return suma
}
console.log(sumarNumeros(2, 3))

const resultado23 = sumarNumeros(2, 3)
console.log(resultado23)


// Método .map

const arrayNumeros = [3, 4, 5, 6, 7, 8, 9]
const resultadoOperacion = arrayNumeros.map(function (numero, posicion) {
    return numero * 2
})
console.log(resultadoOperacion)

// Funciones de tipo flecha

function sumaUno(parametro) {
    return parametro + 1
}
const sumaDos = (numero) => {
    return numero + 2
}

const sumaTres = sumaDos(3)

const resultadoFlecha = arrayNumeros.map() => {

}