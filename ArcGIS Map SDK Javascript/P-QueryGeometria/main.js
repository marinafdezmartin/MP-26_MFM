const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Polygon = await $arcgis.import("@arcgis/core/geometry/Polygon.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const PopupTemplate = await $arcgis.import("@arcgis/core/PopupTemplate.js");

const arcgisMapa = document.querySelector('arcgis-map')

// Plantilla - PopupTemplate
const plantillaPopup = new PopupTemplate({
    title: "{Nombre}, {Municipio}",
    content: [{
        type: "fields",  // autocast
        fieldInfos: [
            {
                fieldName: "Direccion",
                label: "Dirección"
            },
            {
                fieldName: "Telefono",
                label: "Teléfono",
            },
            {
                fieldName: "Email",
                label: "Email",
            },
        ],
    }],
})

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    popupTemplate: plantillaPopup
})

// Geometria
const poligono = new Polygon({
    rings: [[-6.134632, 37.505486], [-5.757916, 37.510752], [-5.762065, 37.256252], [-6.179440, 37.257573]]
})

// No quiero pintar el poligono, quiero hacer el query, y solo necesito la geometria

// Query
const peticionQuery = new Query({
    geometry: poligono,
    spatialRelationship: 'intersects',
    outFields: ['*'],
    returnGeometry: true
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultadoFS) => {
        const entidades = resultadoFS.features
        console.log(entidades)

        const simbologiaPoligono = new WebStyleSymbol({
            name: "Hospital_POI-Large_3",
            styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
        });
        const entidadesSimbologia = entidades.map((grafico) => {
            grafico.symbol = simbologiaPoligono
            return grafico
        })
        const hospitalesSevillaGL = new GraphicsLayer({
            graphics: entidadesSimbologia
        })
        arcgisMapa.map.add(hospitalesSevillaGL)
    })
    resultadoQuery.catch((error) => {
        console.log('ERROR', error)
    })

})
