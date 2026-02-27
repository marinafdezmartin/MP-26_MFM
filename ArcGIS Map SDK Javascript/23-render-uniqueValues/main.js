const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const UniqueValueRenderer = await $arcgis.import("@arcgis/core/renderers/UniqueValueRenderer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')


const simbologiaZepa = new SimpleFillSymbol({
    color: [194, 0, 0, 1],
    outline: {
        cap: "round",
        color: [194, 0, 0, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "backward-diagonal"
});


const simbologiaLIC = new SimpleFillSymbol({
    color: [162, 242, 140, 1],
    outline: {
        cap: "round",
        color: [95, 213, 93, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});


const simbologiaZEC = new SimpleFillSymbol({
    color: [55, 128, 35, 1],
    outline: {
        cap: "round",
        color: [2, 92, 0, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const renderizado = new UniqueValueRenderer({
    field: 'TIPO_NUEVO',
    uniqueValueInfos: [
        {
            label: 'ZEPA',
            symbol: simbologiaZepa,
            value: 'ZEPA'
        },
        {
            label: 'LIC',
            symbol: simbologiaLIC,
            value: 'LIC'
        },
        {
            label: 'LIC/ZEPA',
            symbol: simbologiaZEC,
            value: 'LIC/ZEPA'
        }
    ]
})

const redNaturaFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Red_Natura_2000/FeatureServer/0',
    renderer: renderizado
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(redNaturaFL)
})