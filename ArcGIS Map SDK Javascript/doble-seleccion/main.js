// Imports
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {

    // crear capa de paises
    const paisesFL = new FeatureLayer({
        url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries/FeatureServer/0'
    })
    // Esta es la capa final. La creamos aqui porque si lo hacemos dentro del bucle se crean mazo
    const incendiosEspañaGL = new GraphicsLayer({
        title: 'Incendios en España en los últimos 7 días'
    })

    // QUERY ESP
    // hacemos el query de ESP
    const peticionQueryPaises = new Query({
        where: "ISO_CC='ESP'",
        returnGeometry: true,
        outFields: ['*']
    })
    // Mandamos el query
    const resultadoQueryPaises = paisesFL.queryFeatures(peticionQueryPaises)
    resultadoQueryPaises.then((resultadoEspañaFS) => {
        console.log(resultadoEspañaFS.features)
        const poligonosEspaña = resultadoEspañaFS.features

        // Geometria de los poligonos (.map)
        poligonosEspaña.map(poligono => {
            const peticionQueryIncendios = new Query({
                geometry: poligono.geometry,
                spatialRelationship: 'intersects',
                outFields: ['*'],
                returnGeometry: true
            });

            //Capa incendios
            const incendiosFL = new FeatureLayer({
                url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/MODIS_Thermal_v1/FeatureServer/1'
            })

            const resultadoQueryIncendios = incendiosFL.queryFeatures(peticionQueryIncendios)
            resultadoQueryIncendios.then((resultadoIncendiosFS) => {
                console.log(resultadoIncendiosFS.features);
                const entidadesIncendios = resultadoIncendiosFS.features

                // simbologia
                const simbologiaPunto = new WebStyleSymbol({
                    name: "Fire",
                    styleUrl: "https://www.arcgis.com/sharing/rest/content/items/b117b6e14d7b429a9ea8c58a5cb6abad/data"
                });

                const entidadesIncendiosSimbologia = entidadesIncendios.map((grafico) => {
                    grafico.symbol = simbologiaPunto
                    return grafico
                });

                incendiosEspañaGL.addMany(entidadesIncendiosSimbologia)
                
            });
        })
        arcgisMapa.map.add(incendiosEspañaGL)
    })
})