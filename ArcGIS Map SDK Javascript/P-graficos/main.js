const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Point = await $arcgis.import("@arcgis/core/geometry/Point.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const Polyline = await $arcgis.import("@arcgis/core/geometry/Polyline.js");
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");
const Polygon = await $arcgis.import("@arcgis/core/geometry/Polygon.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')

// Capa grafica = grafico = geometria + simbologia

// Punto
const punto = new Point({
    latitude: '37.382981',
    longitude: '-5.985275'
})

const simbologiaPunto = new SimpleMarkerSymbol({
    angle: 0,
    color: [255, 0, 0, 0.5],
    outline: {
        cap: "round",
        color: [153, 0, 0, 0.5],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    path: "undefined",
    size: 20,
    style: "circle",
    xoffset: 0,
    yoffset: 0
});

const graficoPunto = new Graphic({
    geometry: punto,
    symbol: simbologiaPunto
})

const puntoGL = new GraphicsLayer({
    graphics: graficoPunto
})

// Polilinea
const polilinea = new Polyline({
    paths: [[-5.917362, 37.360666], [-5.861658, 37.414364], [-5.812916, 37.473549]]
})

const simbologiaPolilinea = new SimpleLineSymbol({
    cap: "round",
    color: [0, 122, 194, 1],
    join: "round",
    miterLimit: 1,
    style: "solid",
    width: 3
});

const graficoPolilinea = new Graphic({
    geometry: polilinea,
    symbol: simbologiaPolilinea
})

const polilineaGL = new GraphicsLayer({
    graphics: graficoPolilinea
})


// Poligono
const poligono = new Polygon({
    rings: [[-6.209041, 37.456211], [-6.087894, 37.442377], [-6.102000, 37.345469], [-6.267954, 37.359321]]
})

const simbologiaPoligono = new SimpleFillSymbol({
    color: [0, 240, 40, 0.5],
    outline: {
        cap: "round",
        color: [13, 194, 0, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const graficoPoligono = new Graphic ({
    geometry: poligono,
    symbol: simbologiaPoligono
})

const poligonoGL = new GraphicsLayer ({
    graphics: graficoPoligono
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(puntoGL)
    arcgisMapa.map.add(polilineaGL)
    arcgisMapa.map.add(poligonoGL)
})