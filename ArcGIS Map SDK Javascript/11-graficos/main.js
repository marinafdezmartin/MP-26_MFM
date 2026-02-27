// Añadir puntos al mapa

// Imports
const Point = await $arcgis.import("@arcgis/core/geometry/Point.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");


// PASO 1: Creamos la geometría
const geometriaPunto = new Point({
    latitude: 41,
    longitude: -4
})
console.log(geometriaPunto)

// PASO 2: Simbología
const simbologiaPunto = new SimpleMarkerSymbol({
    angle: 293,
    color: [101, 159, 80, 1],
    outline: {
        cap: "round",
        color: [86, 113, 89, 1],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    path: "undefined",
    size: 12,
    style: "circle",
    xoffset: 0,
    yoffset: 0
});

// PASO 3: Unimos geometría + simbología -> GRAPHIC
const graficoPunto = new Graphic ({
    geometry: geometriaPunto,
    symbol: simbologiaPunto
})

// PASO 4: Crear una capa donde esten las geometrias de mis puntos
const capaGraficaGL = new GraphicsLayer ()

capaGraficaGL.add(graficoPunto)

// PASO 5: Seleccionar el mapa y añadirlo
const arcgisMapa = document.querySelector('arcgis-map')

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(capaGraficaGL)
})
