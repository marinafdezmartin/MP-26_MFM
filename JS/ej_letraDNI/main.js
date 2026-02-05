const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T']

const dni = prompt(`Introduzca el número de su DNI sin letra`)



if (dni < 0 || dni > 99999999) {
    alert(`El número introducido no es válido`)
} else {
    // Las constantes dentro del condicional, pq asi cuando termina se "borran"
    const resto = dni % 23
    const letraDNI = letras[resto]
    const dniStr = new String(dni)
    const dniCompleto = dni + letraDNI

    alert(`La letra de su DNI es ${letraDNI}`);
    alert(`Su DNI es ${dniCompleto}`);
}



