const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const paisesFL = new FeatureLayer({
    url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries/FeatureServer/0'
})

const indenciosFL = new FeatureLayer({
    url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/MODIS_Thermal_v1/FeatureServer/1'
})

const incendiosEspañaGL = new GraphicsLayer ({
    title: 'Incendios en España en los últimos 7 días'
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    // arcgisMapa.map.add(paisesFL)
    const peticionQuery = new Query({
        where: "ISO_CC='ESP'",
        returnGeometry: true,
        outFields: ['*']
    })

    const resultadoQuery = paisesFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultadoFS) => {
        const poligonosEsp = resultadoFS.features
        // No quiero meterle simbologia pq no me interesa que se vean en el mapa 
        // Hay que hacer la otra Query de geometria = ESPAÑA

        poligonosEsp.map(poligono => {
            const peticionQueryIncendios = new Query({
                geometry: poligono.geometry,
                spatialRelationship: 'intersects',
                outFields: ['*'],
                returnGeometry: true
            })
            const resultadoQueryIncendios = indenciosFL.queryFeatures(peticionQueryIncendios)
            resultadoQueryIncendios.then((resultadoIncendiosFS) => {
                const entidadesIncendios = resultadoIncendiosFS.features
                console.log(entidadesIncendios)

                const simbologiaIncendio = new WebStyleSymbol({
                    name: "Fire",
                    styleUrl: "https://www.arcgis.com/sharing/rest/content/items/6eeef46c653b40c9bda04f9bed913b70/data"
                });

                const entidadesIncendiosSimbologia = entidadesIncendios.map((incendio) => {
                    incendio.symbol = simbologiaIncendio
                    return incendio
                })
                // Crear CAPA GRAFICA (fuera) si se hace dentro del bucle se añaden varias
                // Añadimos los graficos a la capa
                incendiosEspañaGL.addMany(entidadesIncendiosSimbologia)
            })
        })
        arcgisMapa.map.add(incendiosEspañaGL)
    })
})