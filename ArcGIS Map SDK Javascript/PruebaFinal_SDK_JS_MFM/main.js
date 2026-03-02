const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const UniqueValueRenderer = await $arcgis.import("@arcgis/core/renderers/UniqueValueRenderer.js");
const SimpleMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleMarkerSymbol.js");
const PopupTemplate = await $arcgis.import("@arcgis/core/PopupTemplate.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Polyline = await $arcgis.import("@arcgis/core/geometry/Polyline.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const Point = await $arcgis.import("@arcgis/core/geometry/Point.js");
const SimpleLineSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleLineSymbol.js");
const PictureMarkerSymbol = await $arcgis.import("@arcgis/core/symbols/PictureMarkerSymbol.js");
const SimpleRenderer = await $arcgis.import("@arcgis/core/renderers/SimpleRenderer.js");


const arcgisMapa = document.querySelector('arcgis-map')

// SIMBOLOGIA Render - Hipermercados
const carrefourSymbol = new PictureMarkerSymbol({
    angle: 0,
    height: 18,
    url: "https://img.icons8.com/?size=100&id=gqmzViMZ5IoH&format=png&color=000000",
    width: 18,
    xoffset: 0,
    yoffset: 0
});

const alcampoSymbol = new PictureMarkerSymbol({
    angle: 0,
    height: 18,
    url: "https://img.icons8.com/ios-glyphs/30/FA5252/bird.png",
    width: 18,
    xoffset: 0,
    yoffset: 0
});


const hipercorSymbol = new PictureMarkerSymbol({
    angle: 0,
    height: 10,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Hipercor_logo.svg/1920px-Hipercor_logo.svg.png",
    width: 50,
    xoffset: 0,
    yoffset: 0
});


const eleclercSymbol = new PictureMarkerSymbol({
    angle: 0,
    height: 10,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/E.Leclerc_logo.svg/1920px-E.Leclerc_logo.svg.png",
    width: 50,
    xoffset: 0,
    yoffset: 0
});


const costcoSymbol = new PictureMarkerSymbol({
    angle: 0,
    height: 20,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/1920px-Costco_Wholesale_logo_2010-10-26.svg.png",
    width: 50,
    xoffset: 0,
    yoffset: 0
});

// Simbologia - Mercados
const simbologiaMercadoss = new PictureMarkerSymbol({
    angle: 0,
    height: 18,
    url: "https://img.icons8.com/glyph-neue/64/C850F2/shop--v1.png",
    width: 18,
    xoffset: 0,
    yoffset: 0
});



// RENDERER - Hipermercados
const hipermercadosRenderizado = new UniqueValueRenderer({
    field: 'ETIQUETA',
    uniqueValueInfos: [
        {
            label: 'Carrefour',
            symbol: carrefourSymbol,
            value: 'Carrefour'
        },
        {
            label: 'Alcampo',
            symbol: alcampoSymbol,
            value: 'Alcampo'
        },
        {
            label: 'Hipercor',
            symbol: hipercorSymbol,
            value: 'Hipercor'
        },
        {
            label: 'E-Leclerc',
            symbol: eleclercSymbol,
            value: 'E-Leclerc'
        },
        {
            label: 'Costco',
            symbol: costcoSymbol,
            value: 'Costco'
        }
    ]
})

// SimpleRenderer - Mecados
const simpleRendererMercados = new SimpleRenderer({
    symbol: simbologiaMercadoss
})

// POPUP - Mercados
const plantillaPopupMercados = new PopupTemplate({
    title: "{BUSCA}",
    content: [{
        type: "fields",
        fieldInfos: [
            {
                fieldName: 'DIRECCION',
                label: 'Dirección'
            },
            {
                fieldName: 'MUNICIPIO',
                label: 'Término municipal'
            }
        ]
    }]
})


// Capas
const hipermercadosFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/3',
    renderer: hipermercadosRenderizado,
    effect: "bloom(1.5, 0.5px, 0.1)",
    title: 'Hipermercados de la Comunidad de Madrid'
})

const mercadosFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/5',
    popupTemplate: plantillaPopupMercados,
    title: 'Mercados de la Comunidad de Madrid',
    renderer: simpleRendererMercados
})

const mercadillosFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/4'
})

// CLICK EVENT
// Capa grafica para guardar los puntos
const resultadosGL = new GraphicsLayer({
    title: 'Resultados click',
    effect: "bloom(1.5, 0.5px, 0.1)"
})
let view = null

// MAPA
arcgisMapa.addEventListener('arcgisViewReadyChange', () => {

    // QUERY - Mercadillos
    const peticionQuery = new Query({
        where: "MUNICIPIO = 'Madrid'",
        returnGeometry: true,
        outFields: ['*']
    })

    const resultadoQuery = mercadillosFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultadoFS) => {
        const entidades = resultadoFS.features

        const mercadilloSymbol = new WebStyleSymbol({
            name: "Shopping Center_POI-Large_3",
            styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
        });

        const entidadesSimbologia = entidades.map((mercadillo) => {
            mercadillo.symbol = mercadilloSymbol
            return mercadillo
        })

        const mercadillosMadridGL = new GraphicsLayer({
            title: 'Mercadillos del término municipal de Madrid',
            graphics: entidadesSimbologia
        })
        arcgisMapa.map.add(mercadillosMadridGL)
    })

    arcgisMapa.map.add(hipermercadosFL)
    arcgisMapa.map.add(mercadosFL)
    arcgisMapa.map.add(resultadosGL)
    view = arcgisMapa.view
})

// EVENTO CLICK
arcgisMapa.addEventListener('click', (evento) => {
    if (!view) return
    const mapPoint = view.toMap({ x: evento.clientX, y: evento.clientY })
    if (!mapPoint) return

    resultadosGL.removeAll()

    const peticionQueryLinea = new Query({
        geometry: mapPoint,
        distance: 2,
        units: 'kilometers',
        spatialRelationship: 'intersects',
        outFields: ['*'],
        returnGeometry: true
    })

    const resultadoQueryLinea = mercadosFL.queryFeatures(peticionQueryLinea)
    resultadoQueryLinea.then((resultadoMercadoFS) => {
        const lineaSymbol = new SimpleLineSymbol({
            color: [0, 200, 255, 1],
            width: 1,
            style: "solid"
        })
        const mercadosLineas = resultadoMercadoFS.features
        const mercadosLineasSymbol = mercadosLineas.map((mercado) => {
            const destino = mercado.geometry

            const linea = new Polyline({
                paths: [
                    [mapPoint.x, mapPoint.y],
                    [destino.x, destino.y]
                ],
                spatialReference: mapPoint.spatialReference
            })
            mercado.geometry = linea,
                mercado.symbol = lineaSymbol
            return mercado
        })
        resultadosGL.addMany(mercadosLineasSymbol)
    })

})

