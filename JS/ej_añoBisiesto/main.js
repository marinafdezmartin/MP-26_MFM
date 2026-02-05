const anyo = 2012

if (anyo % 4 === 0) {
    if (anyo % 100 === 0) {
        if (anyo % 400 === 0) {
            console.log(`El año ${anyo} es bisiesto`)
        } else {
            console.log(`El año ${anyo} no es bisiesto`)
        }
    } else {
        console.log(`El año ${anyo} es bisiesto`)
    }
} else {
    console.log(`El año ${anyo} no es bisiesto`)
}