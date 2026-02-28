const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const HeatmapRenderer = await $arcgis.import("@arcgis/core/renderers/HeatmapRenderer.js");
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')

const renderizadoHeatmap = new HeatmapRenderer({
    colorStops: [
        { color: "rgba(63, 40, 102, 0)", ratio: 0 },
        { color: "#472b7781", ratio: 0.083 },
        { color: "#4e2d8773", ratio: 0.166 },
        { color: "#56309883", ratio: 0.249 },
        { color: "#5d32a880", ratio: 0.332 },
        { color: "#6735be83", ratio: 0.415 },
        { color: "#7239d48e", ratio: 0.498 },
        { color: "#7c3ce985", ratio: 0.581 },
        { color: "#853fff8f", ratio: 0.664 },
        { color: "#a46fbfaf", ratio: 0.747 },
        { color: "#c29f8098", ratio: 0.83 },
        { color: "#e0d0409f", ratio: 0.913 },
        { color: "#ffff00ab", ratio: 1 },
    ],
    maxDensity: 0.01,
    minDensity: 0,
})

const simbologiaSimple = new WebStyleSymbol({
    name: "Hospital_POI-Large_3",
    styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
});

const renderizadoSimple = new SimpleRenderer({
    symbol: simbologiaSimple
})

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    renderer: renderizadoHeatmap
})
const hospitalesSymbFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    renderer: renderizadoSimple
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(hospitalesFL)
    arcgisMapa.map.add(hospitalesSymbFL)
})