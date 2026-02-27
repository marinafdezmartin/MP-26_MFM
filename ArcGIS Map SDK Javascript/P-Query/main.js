const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    // arcgisMapa.map.add(hospitalesFL)

    // Creamos el query
    const peticionQuery = new Query({
        where: "Provincia='Asturias'",
        returnGeometry: true,
        outFields: ['*']
    })

    // Enviamos el query a la capa -> lo guardamos en varable | resultadoQuery = PROMESA
    const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultadoFS) => {
        console.log(resultadoFS)
        // son Graficos, tienen geometria pero NO simbologia
        const hospitales = resultadoFS.features
        // Crear simbologia
        const simbologiaHospitales = new WebStyleSymbol({
            name: "Clinic",
            styleUrl: "https://www.arcgis.com/sharing/rest/content/items/806df898e9c04516a704a9f93e2a0a5e/data"
        });
        // Añadir symb a TODAS entidades = .map
        const hospitalesSimbologia = hospitales.map((grafico) => {
            grafico.symbol = simbologiaHospitales
            return grafico
        })
        // Crear Graphic Layer
        const hospitalesAsturiasGL = new GraphicsLayer
        hospitalesAsturiasGL.addMany(hospitalesSimbologia)
        arcgisMapa.map.add(hospitalesAsturiasGL)
    })
})
