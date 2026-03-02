const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const Graphic = await $arcgis.import("@arcgis/core/Graphic.js");
const Polyline = await $arcgis.import("@arcgis/core/geometry/Polyline.js");

const arcgisMapa = document.querySelector('arcgis-map')
const mercadosFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Comercios_de_la_Comunidad_de_Madrid_WFL1/FeatureServer/5'
})
const resultadosLayer = new GraphicsLayer()
let view = null

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(mercadosFL)
    arcgisMapa.map.add(resultadosLayer)
    view = arcgisMapa.view
})




arcgisMapa.addEventListener('click', async (evento) => {
    if (!view) return
    const mapPoint = view.toMap({ x: evento.clientX, y: evento.clientY })
    if (!mapPoint) return

    resultadosLayer.removeAll()

    const query = mercadosFL.createQuery()
    query.geometry = mapPoint
    query.distance = 2
    query.units = "kilometers"
    query.outFields = ["*"]
    query.returnGeometry = true

    const { features } = await mercadosFL.queryFeatures(query)
    if (!features?.length) return

    const lineSymbol = {
        type: "simple-line",
        color: [0, 120, 255, 0.8],
        width: 2
    }

    const graphics = features.map((feature) => {
        const destino = feature.geometry
        const linea = new Polyline({
            paths: [
                [mapPoint.x, mapPoint.y],
                [destino.x, destino.y]
            ],
            spatialReference: mapPoint.spatialReference
        })

        return new Graphic({
            geometry: linea,
            symbol: lineSymbol
        })
    })

    resultadosLayer.addMany(graphics)
})
