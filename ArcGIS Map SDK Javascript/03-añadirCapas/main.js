// Importamos librerías

const Map = await $arcgis.import("@arcgis/core/Map.js");
const MapView = await $arcgis.import("@arcgis/core/views/MapView.js");
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");


const mapa = new Map({
    basemap: 'topo-vector',
})

const vistaMapa = new MapView({
    container: 'viewDiv',
    map: mapa
})

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

const hospitalesPortalItemFL = new FeatureLayer({
    portalItem: {
        id: '68745a7fb7a348b6b0d722c8517790af'
    }
})

mapa.add(hospitalesPortalItemFL)