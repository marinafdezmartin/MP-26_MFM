const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");
const FlowRenderer = await $arcgis.import("@arcgis/core/renderers/FlowRenderer.js");
const ColorVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/ColorVariable.js");

const arcgisMapa = document.querySelector('arcgis-map')

const variableColor = new ColorVariable({
    fields: 'Magnitude',
    stops: [
        { value: 0, color: '#d6ccc2' },
        { value: 7, color: '#d5bdaf' },
        { value: 14, color: '#f5ebe0' }
    ],
})

const renderizado = new FlowRenderer({
    flowSpeed: 35,
    trailWidth: '1px',
    trailLength: 250,
    density: 3,
    // color: [50, 120, 240],
    visualVariables: [variableColor]
})

const vientoITL = new ImageryTileLayer({
    url: 'https://tiledimageservices.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NLDAS_Hourly_8_30_2021/ImageServer',
    renderer: renderizado,

})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(vientoITL)
    console.log(vientoITL)
})
