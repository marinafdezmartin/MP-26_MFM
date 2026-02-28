const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')
const sketch = document.querySelector('arcgis-sketch')

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

// Capa grafica para guardar los puntos (sketch)
const capaSketchGL = new GraphicsLayer()

// Capa donde se pintan los resultados de los Hospitales
const hospitalesBufferGL = new GraphicsLayer()

// Añadimos las capas al mapa
arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(capaSketchGL)
    arcgisMapa.map.add(hospitalesBufferGL)
})

// cuando el sketch esta listo, le asigno la capa (1º llamar al sketch)
sketch.addEventListener('arcgisReady', () => {
    sketch.layer = capaSketchGL
})

// cuando creemos en el sketch:
sketch.addEventListener('arcgisCreate', (evento) => {
    if (evento.detail.state === 'complete' && evento.detail.tool === 'point') {
        const geometriaPunto = evento.detail.graphic.geometry

        // Para que no se vayan acumulando
        hospitalesBufferGL.removeAll()
        capaSketchGL.removeAll()

        // Query
        const peticionQuery = new Query({
            geometry: geometriaPunto,
            distance: 10,
            units: 'kilometers',
            spatialRelationship: 'intersects',
            outFields: ['*'],
            returnGeometry: true
        })
        const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
        resultadoQuery.then((resultadoFS) => {
            const entidades = resultadoFS.features

            const simbologiaEntidades = new WebStyleSymbol({
                name: "Hospital_POI-Large_3",
                styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
            });

            const entidadesSimbologia = entidades.map((hospital) => {
                hospital.symbol = simbologiaEntidades
                return hospital
            })

            hospitalesBufferGL.addMany(entidadesSimbologia)
            console.log('Hospitales encontrados:', entidades.length)
        })

    }
})