const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer.js");

const arcgisMapa = document.querySelector('arcgis-map')


const simbologiaHospitales = new WebStyleSymbol({
    name: "Hospital_POI-Large_3",
    styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
});

const renderizado = new SimpleRenderer({
    type: 'simple',
    symbol: simbologiaHospitales
})

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    renderer: renderizado
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(hospitalesFL)
})