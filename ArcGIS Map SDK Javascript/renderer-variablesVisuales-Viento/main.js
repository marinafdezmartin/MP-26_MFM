const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const RotationVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/RotationVariable.js");
const SizeVariable = await $arcgis.import("@arcgis/core/renderers/visualVariables/SizeVariable.js");

const arcgisMapa = document.querySelector('arcgis-map')

const variableRotacion = new RotationVariable({
    field: "WIND_GUST",
    rotationType: "geographic",
})

const variableTamano = new SizeVariable({
    field: "WIND_SPEED",
    minDataValue: 0,
    maxDataValue: 100,
    minSize: 8,
    maxSize: 40,
    legendOptions: {
        title: "Velocidad del aire (kn/h)",
        order: "descending-values",
    },
})


const less2 = new SimpleMarkerSymbol({
    angle: 0,
    color: [202, 0, 32, 1],
    outline: {
        cap: "round",
        color: [0, 122, 194, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0
    },
    path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
    size: 8,
});

const less32 = new SimpleMarkerSymbol({
    angle: 0,
    color: [245, 168, 134, 1],
    outline: {
        cap: "round",
        color: [0, 122, 194, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0
    },
    path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
    size: 8,
});


const less82 = new SimpleMarkerSymbol({
    angle: 0,
    color: [175, 211, 229, 1],
    outline: {
        cap: "round",
        color: [0, 122, 194, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0
    },
    path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
    size: 8,
});

const more82 = new SimpleMarkerSymbol({
    angle: 0,
    color: [5, 113, 176, 1],
    outline: {
        cap: "round",
        color: [0, 122, 194, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 0
    },
    path: 'M14.5,29 23.5,0 14.5,9 5.5,0z',
    size: 8,
});

const renderizado = new ClassBreaksRenderer({
    field: 'TEMP',
    classBreakInfos: [
        {
            minValue: -40,
            maxValue: 2,
            symbol: less2,
            label: "< -16,7",
        },
        {
            minValue: 2,
            maxValue: 32,
            symbol: less32,
            label: "-16,7 - 0",
        },
        {
            minValue: 32,
            maxValue: 82,
            symbol: less82,
            label: "0 - 27,8"
        },
        {
            minValue: 82,
            maxValue: 104,
            symbol: more82,
            label: "> 27,8"
        },
    ],
    legendOptions: {
        title: "Temperatura del aire (°C)",
        order: "descending-values",
    },
    visualVariables: [variableRotacion, variableTamano]
})

const vientoFL = new FeatureLayer({
    url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0',
    renderer: renderizado
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(vientoFL)
})