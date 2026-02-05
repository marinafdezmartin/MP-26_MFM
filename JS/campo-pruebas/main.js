console.log('Hola desde el otro lado')

const arbolVerde = 'Arbol Verde'

console.log(arbolVerde)

let cocheAzul = 'Coche Azul'

cocheAzul = 'Coche Verde'

console.log(cocheAzul)


const arrayCoches = ['coche azul', 'coche verde', 4]
console.log(arrayCoches[0])

// CONDICIONALES

const numeroPeces = 17

if (numeroPeces <= 4) {
    console.log(`Tienes ${numeroPeces} que son menos de 4 peces`)
}

// BUCLES

for (let contador = 0; contador < 6; contador++) {

    console.log(`Estoy en la interación número ${contador}`)
}

const semana =['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

for (const dia of semana) {
    console.log(dia)
}

for (const posicion in semana) {
    console.log(posicion)
}