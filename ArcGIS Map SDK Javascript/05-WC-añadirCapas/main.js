// Imports
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");

const arcgisMap = document.querySelector('arcgis-map')

arcgisMap.addEventListener('arcgisViewReadyChange', (eventoViewReadyChange) => {

    // este evento se ejecuta cuando se carga la vista del mapa

    // Creamos la capa
    const hospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer'
    })

    arcgisMap.map.add(hospitalesFL)

})