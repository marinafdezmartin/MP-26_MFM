// Imports
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Polygon = await $arcgis.import("@arcgis/core/geometry/Polygon.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");


const arcgisMapa = document.querySelector('arcgis-map')

const hospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
    })
    // arcgisMapa.map.add(hospitalesFL)

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {

// POLIGONO
    // Creamos la GEOMETRIA
    const geometriaPoligono = new Polygon({
        rings: [[-4.166378, 40.964757], [-4.068390, 40.989108], [-4.035728, 40.909086], [-4.136981, 40.895354]]
    })
    // Le metemos SIMBOLOGIA
    const simbologiaPoligono = new SimpleFillSymbol({
        color: [255, 0, 0, 1],
        outline: {
            cap: "round",
            color: [255, 0, 0, 1],
            join: "round",
            miterLimit: 1,
            style: "solid",
            width: 1
        },
        style: "backward-diagonal"
    });
    // Unimos geometria + simbología = GRAPHIC
    const graficoPoligono = new Graphic({
        geometry: geometriaPoligono,
        symbol: simbologiaPoligono
    })
    // Creamos la capa (GL)
    const poligonoGL = new GraphicsLayer({
        graphics: [graficoPoligono],
        title: 'Capa gráfica del polígono'
    })

    // Añadimos la capa
    arcgisMapa.map.add(poligonoGL)

// QUERY
    // Hacemos el query
    const peticionQuery = new Query({
        geometry: geometriaPoligono,
        spatialRelationship: 'intersects',
        outFields: ['*'],
        returnGeometry: true
    })

    // Lo guardamos en una variable
    // El resultado es una PROMESA!!! / .queryfeatures (mandas el query a la capa (hospitales)) / el resultado
    const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultado) => {
        console.log(resultado)
        const entidades = resultado.features

        // añadimos simbologia
        const simbologiaPunto = new SimpleMarkerSymbol({
            angle: 0,
            color: [255, 255, 255, 0.25],
            outline: {
                cap: "round",
                color: [0, 122, 194, 1],
                join: "round",
                miterLimit: 1,
                style: "solid",
                width: 4
            },
            path: "undefined",
            size: 12,
            style: "cross",
            xoffset: 0,
            yoffset: 0
        });
        const entidadesConSimbologia = entidades.map((grafico) => {
            grafico.symbol = simbologiaPunto
            return grafico
        });
        const hospitalesPoligonoFL = new GraphicsLayer({
            title: 'Hospitales dentro del polígono'
        })
        hospitalesPoligonoFL.addMany(entidadesConSimbologia)
        arcgisMapa.map.add(hospitalesPoligonoFL)
    })
    resultadoQuery.catch((error) => {
        console.log('ERROR', error)
    })
})