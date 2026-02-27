const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");

const arcgisMapa = document.querySelector("arcgis-map");
const sketch = document.querySelector("arcgis-sketch");

const hospitalesFL = new FeatureLayer({
    url: "https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0"
});

// Capa donde se guarda el punto que dibujo
const capaGraficaSketch = new GraphicsLayer({
    title: "Punto (Sketch)"
});

// Capa donde pinto los hospitales encontrados
const capaGraficaResultados = new GraphicsLayer({
    title: "Hospitales (resultado)"
});

arcgisMapa.addEventListener("arcgisViewReadyChange", () => {
    arcgisMapa.map.add(capaGraficaSketch);
    arcgisMapa.map.add(capaGraficaResultados);
});

// Cuando el sketch está listo, le asigno su capa 
sketch.addEventListener("arcgisReady", () => {
    sketch.layer = capaGraficaSketch;
});

sketch.addEventListener("arcgisCreate", (evento) => {
    if (evento.detail.state === 'complete' && evento.detail.tool === 'point') {

        const geometriaPunto = evento.detail.graphic.geometry;

        // Para que no se vayan acumulando
        capaGraficaResultados.removeAll();

        // Query espacial por distancia
        const peticionQuery = new Query({
            geometry: geometriaPunto,
            distance: 10,
            units: "kilometers",
            spatialRelationship: "intersects",
            outFields: ["*"],
            returnGeometry: true
        });
        const resultadoQuery = hospitalesFL.queryFeatures(peticionQuery)
        resultadoQuery.then((resultadoFS) => {
            // resultadoFS.features son los hospitales encontrados
            const entidades = resultadoFS.features

            const simbologiaPunto = new WebStyleSymbol({
                name: "Hospital_POI-Large_3",
                styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
            });

            const entidadesConSimbologia = entidades.map((hospital) => {
                hospital.symbol = simbologiaPunto
                return hospital
            })

            capaGraficaResultados.addMany(entidadesConSimbologia);
            console.log("Hospitales encontrados:", resultadoFS.features.length);
            console.log(resultadoFS);
        });
    }


});