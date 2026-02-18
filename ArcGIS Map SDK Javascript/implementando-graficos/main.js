// Imports
const Point = await $arcgis.import("@arcgis/core/geometry/Point.js");
const Polyline = await $arcgis.import("@arcgis/core/geometry/Polyline.js");
const Polygon = await $arcgis.import("@arcgis/core/geometry/Polygon.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");

const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");

const arcgisMapa = document.querySelector('arcgis-map')

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {

    // Creamos la geometría
    const geometriaPunto = new Point({
        latitude: 40.452798,
        longitude: -3.688329
    })

    const geometriaPolilinea = new Polyline({
        paths: [[-3.801502, 40.445662], [-3.792232, 40.445858], [-3.774637, 40.448536]]
    })

    const geometriaPoligono = new Polygon({
        rings: [[-3.680165, 40.421439], [-3.676567, 40.411297], [-3.688510, 40.409762], [-3.688304, 40.419653]]
    })

    // Simbología
    const simbologiaPunto = new SimpleMarkerSymbol({
        angle: 0,
        color: [0, 30, 255, 1],
        outline: {
            cap: "round",
            color: [0, 122, 194, 1],
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

    const simbologiaPolilinea = new SimpleLineSymbol({
        cap: "round",
        color: [255, 0, 149, 1],
        join: "round",
        miterLimit: 1,
        style: "short-dash",
        width: 2
    });

    const simbologiaPoligono = new SimpleFillSymbol({
        color: [91, 149, 101, 1],
        outline: {
            cap: "round",
            color: [44, 88, 52, 1],
            join: "round",
            miterLimit: 1,
            style: "solid",
            width: 1
        },
        style: "backward-diagonal"
    });

    // Unimos geometria + simbologia = GRAPHIC
    const graficoPunto = new Graphic({
        geometry: geometriaPunto,
        symbol: simbologiaPunto
    })

    const graficoPolilinea = new Graphic({
        geometry: geometriaPolilinea,
        symbol: simbologiaPolilinea
    })

    const graficoPoligono = new Graphic({
        geometry: geometriaPoligono,
        symbol: simbologiaPoligono
    })

    // Creamos capas
    const capaPuntoGL = new GraphicsLayer()
    capaPuntoGL.add(graficoPunto)

    const capaPolilineaGL = new GraphicsLayer()
    capaPolilineaGL.add(graficoPolilinea)

    const capaPoligonoGL = new GraphicsLayer()
    capaPoligonoGL.add(graficoPoligono)

    // añadir capas

    arcgisMapa.map.add(capaPuntoGL)
    arcgisMapa.map.add(capaPolilineaGL)
    arcgisMapa.map.add(capaPoligonoGL)
})