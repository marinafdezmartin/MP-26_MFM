const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const HeatmapRenderer = await $arcgis.import("@arcgis/core/renderers/HeatmapRenderer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const renderizado = new HeatmapRenderer({
    colorStops: [
        { color: "rgba(63, 40, 102, 0)", ratio: 0 },
        { color: "#472b77", ratio: 0.083 },
        { color: "#4e2d87", ratio: 0.166 },
        { color: "#563098", ratio: 0.249 },
        { color: "#5d32a8", ratio: 0.332 },
        { color: "#6735be", ratio: 0.415 },
        { color: "#7139d4", ratio: 0.498 },
        { color: "#7b3ce9", ratio: 0.581 },
        { color: "#853fff", ratio: 0.664 },
        { color: "#a46fbf", ratio: 0.747 },
        { color: "#c29f80", ratio: 0.83 },
        { color: "#e0cf40", ratio: 0.913 },
        { color: "#ffff00", ratio: 1},
    ],
    maxDensity: 0.01,
    minDensity: 0,
})

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    opacity: 0.8,
    renderer: renderizado
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(hospitalesFL)
})