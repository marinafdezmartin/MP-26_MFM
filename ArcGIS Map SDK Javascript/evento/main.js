const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', () => {
    const vistaMapa = arcgisMap.view

    // metemos el evento dentro de una variable para luego poder quitarlo
    const eventoClickMapa = vistaMapa.on('click', (eventoClick) => {

        const geometriaPunto = eventoClick.mapPoint
        const resultadoMovimiento = vistaMapa.goTo(geometriaPunto)

        // PROMESA - El movimiento sale bien
        resultadoMovimiento.then(() => {
            vistaMapa.zoom = 15
        })
        // PROMESA - El movimiento sale mal
        resultadoMovimiento.catch((error) => {
            console.log(error)
        })
    })
})