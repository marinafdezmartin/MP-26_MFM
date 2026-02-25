const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const SizeVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/SizeVariable.js");

const arcgisMapa = document.querySelector('arcgis-map')


const variableVisualTamaño = new SizeVariable({
    field: 'Poblacion',
    minDataValue: 0,
    maxDataValue: 7500000,
    minSize: 8,
    maxSize: 40
})

const simbologiaPoligono = new WebStyleSymbol({
    name: "User",
    styleUrl: "https://www.arcgis.com/sharing/rest/content/items/806df898e9c04516a704a9f93e2a0a5e/data"
});

const renderizado = new SimpleRenderer({
    symbol: simbologiaPoligono,
    visualVariables: variableVisualTamaño

})
const estudiosPoblacionFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/YFraetVkEAF1lMag/ArcGIS/rest/services/Nivel_estudios_y_poblaci%c3%b3n_por_CCAA_2021/FeatureServer/1',
    renderer: renderizado,
    title: 'Nivel de estudios y población por CCAA en 2021'
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(estudiosPoblacionFL)
})