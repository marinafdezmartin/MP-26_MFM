const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')

const less10K = new SimpleFillSymbol({
    color: [163, 177, 138, 1],
    outline: {
        cap: "round",
        color: [255, 255, 255, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0.5
    },
    style: "solid"
});

const less30K = new SimpleFillSymbol({
    color: [88, 129, 87, 1],
    outline: {
        cap: "round",
        color: [255, 255, 255, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0.5
    },
    style: "solid"
});

const more30K = new SimpleFillSymbol({
    color: [58, 90, 64, 1],
    outline: {
        cap: "round",
        color: [255, 255, 255, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0.5
    },
    style: "solid"
});


const renderizado = new ClassBreaksRenderer({
    field: "F_POBLACION__Población",
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 10000,
            symbol: less10K,
            label: "< 10K",
        },
        {
            minValue: 10000,
            maxValue: 30000,
            symbol: less30K,
            label: "10K - 30K",
        },
        {
            minValue: 30000,
            maxValue: 90000,
            symbol: more30K,
            label: "> 30K"
        },
    ],
});

const zonasSaludFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZONAS_BASICAS_SALUD_MADRID/FeatureServer/0',
    renderer: renderizado
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(zonasSaludFL)
})