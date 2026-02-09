const numero = prompt('Introduzca un número para calcular su factorial')

if (isNaN(numero) || numero < 0) {
    alert("Por favor, ingresa un número entero positivo válido.");
} else {
    let multiplicacion = 1
    // for (variable; expresion; aumento) * i = contador
    for (let contador = 1; contador <= numero; contador++) {
        multiplicacion = multiplicacion * contador
    }
    alert(`El factorial de ${numero} es ${multiplicacion}`);
}
