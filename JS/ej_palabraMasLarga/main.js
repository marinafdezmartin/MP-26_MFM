const palabras = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

let palabraMasLarga

for (const palabra of palabras) {
    
    if (palabraMasLarga) {
        if (palabraMasLarga.length < palabra.length) {
            palabraMasLarga = palabra
        } 
    } else {
        palabraMasLarga = palabra
    }

}
console.log(palabraMasLarga)