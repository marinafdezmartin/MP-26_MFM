const numero1 = 90
const numero2 = 60

if (Math.abs(100 - numero1) < Math.abs(100 - numero2)) {
    console.log(`El número ${numero1} está más cerca del 100 que el número ${numero2}`)
} else {
    console.log(`El número ${numero2} está más cerca del 100 que el número ${numero1}`)
}