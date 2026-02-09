// Seleccionar elementos en mi documento HTML
// id
const subtitulo = document.getElementById('subtitulo')
console.log(subtitulo)

function subtituloVisible (){
    subtitulo.hidden = !subtitulo.hidden
}
subtituloVisible()
subtituloVisible()

// Cuando ponemos ALL devuelve un Array!!
// tipo
const parrafos = document.querySelectorAll('p')
console.log(parrafos)
// class
const parrafoPares = document.querySelectorAll('.parrafo-par')
console.log(parrafoPares)

// El .forEach es como el .map (.forEach para NodeList) (.map para array)
parrafoPares.forEach((parrafo)=>{
    console.log(parrafo)
})

// Crear elementos

const parrafoNuevo = document.createElement('p')
const nodoTexto = document.createTextNode('Este parrafo esta creado dinámicamente a través de javascript')
parrafoNuevo.appendChild(nodoTexto)

const divVacio = document.getElementById('div-vacio')
divVacio.appendChild(parrafoNuevo)

