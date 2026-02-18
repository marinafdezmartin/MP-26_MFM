// Imports
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");

// Añadir capa de hospitales al mapa
const arcgisMapa = document.querySelector('arcgis-map')

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    // Guardamos la capa en memoria, NO la añadimos
    const hospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
    })
    // arcgisMapa.map.add(hospitalesFL)

    // Hacemos el Query
    const peticionQuery = new Query({
        // DOBLE COMILLA
        where: "Provincia='Segovia'",
        returnGeometry: true,
        // Para que devuelva los campos: [* (todos) / 'Provincias']
        outFields: ['*']
    })
    // Lo guardamos en una variable
    // El resultado es una PROMESA!!!
    const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultadoFeatureSet) => {
        const entidades = resultadoFeatureSet.features
        // Hay que crear la simbologia (no tiene)
        const simbologiaPunto = new SimpleMarkerSymbol({
            angle: 0,
            color: [148, 67, 0, 1],
            outline: {
                cap: "round",
                color: [255, 0, 0, 1],
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
        const hospitalesSegoviaGL = new GraphicsLayer 
        hospitalesSegoviaGL.addMany(entidadesConSimbologia)
        arcgisMapa.map.add(hospitalesSegoviaGL)
    });


})

