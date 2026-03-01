const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')


const simbologia1 = new SimpleFillSymbol({
    color: [218, 215, 205, 1],
    outline: {
        cap: "round",
        color: [181, 181, 181, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia2 = new SimpleFillSymbol({
    color: [163, 177, 138, 1],
    outline: {
        cap: "round",
        color: [181, 181, 181, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia3 = new SimpleFillSymbol({
    color: [88, 129, 87, 1],
    outline: {
        cap: "round",
        color: [181, 181, 181, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia4 = new SimpleFillSymbol({
    color: [58, 90, 64, 1],
    outline: {
        cap: "round",
        color: [181, 181, 181, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia5 = new SimpleFillSymbol({
    color: [52, 78, 65, 1],
    outline: {
        cap: "round",
        color: [181, 181, 181, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const renderizadoPoblacion = new ClassBreaksRenderer({
    field: 'F_POBLACION__Población',
    classBreakInfos: [
        {
            minValue: 0,
            maxValue: 15840,
            symbol: simbologia1,
            label: "2.787 – 15.840"
        },
        {
            minValue: 15840,
            maxValue: 24238,
            symbol: simbologia2,
            label: "> 15.840 – 24.238"
        },
        {
            minValue: 24238,
            maxValue: 33033,
            symbol: simbologia3,
            label: "> 24.238 – 33.033"
        },
        {
            minValue: 33033,
            maxValue: 49653,
            symbol: simbologia4,
            label: "> 33.033 – 49.653"
        },
        {
            minValue: 49653,
            maxValue: 73908,
            symbol: simbologia5,
            label: "> 49.653 – 73.908"
        },
    ]
})

const zonasSaludFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZONAS_BASICAS_SALUD_MADRID/FeatureServer/0',
    renderer: renderizadoPoblacion,
    title: ' '
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(zonasSaludFL)
})