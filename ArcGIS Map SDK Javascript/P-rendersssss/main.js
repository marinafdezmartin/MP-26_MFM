const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");
const SimpleFillSymbol = await $arcgis.import("@arcgis/core/symbols/SimpleFillSymbol.js");
const Query = await $arcgis.import("@arcgis/core/rest/support/Query.js");
const WebStyleSymbol = await $arcgis.import("@arcgis/core/symbols/WebStyleSymbol.js");
const GraphicsLayer = await $arcgis.import("@arcgis/core/layers/GraphicsLayer.js");
const PopupTemplate = await $arcgis.import("@arcgis/core/PopupTemplate.js");


const arcgisMapa = document.querySelector('arcgis-map')
const botonHospitales = document.querySelector('#hospitales')
let hospitalesMadridGL = null

// ClassBreak Renderer - Poblacion
const simbologia1 = new SimpleFillSymbol({
    color: [218, 215, 205, 0.7],
    outline: {
        cap: "round",
        color: [181, 181, 181, 0.7],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia2 = new SimpleFillSymbol({
    color: [163, 177, 138, 0.7],
    outline: {
        cap: "round",
        color: [181, 181, 181, 0.7],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia3 = new SimpleFillSymbol({
    color: [88, 129, 87, 0.7],
    outline: {
        cap: "round",
        color: [181, 181, 181, 0.7],
        join: "round",
        miterLimit: 1,
        style: "solid",
        width: 1
    },
    style: "solid"
});

const simbologia4 = new SimpleFillSymbol({
    color: [58, 90, 64, 0.7],
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
    color: [52, 78, 65, 0.7],
    outline: {
        cap: "round",
        color: [181, 181, 181, 0.7],
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

// Plantilla - Poblacion 
const plantillaPopupPoblacion = new PopupTemplate({
    title: "{nombreZSB}",
    content: [{
        type: "fields",
        fieldInfos: [
            {
                fieldName: 'F_POBLACION__Población',
                label: 'Población'
            },
            {
                fieldName: 'F_SUPERFICIE__Superficie',
                label: 'Superficie (km2)'
            },
            {
                fieldName: 'F_DENSIDAD_POBLACION__Densidad_',
                label: 'Densidad de población'
            }
        ]
    }]
})

// Plantilla - PopupTemplate
const plantillaPopupHospitales = new PopupTemplate({
    title: "{Nombre}, {Municipio}",
    content: [{
        type: "fields",
        fieldInfos: [
            {
                fieldName: "Direccion",
                label: "Dirección"
            },
            {
                fieldName: "Telefono",
                label: "Teléfono",
            },
            {
                fieldName: "Email",
                label: "Email",
            },
        ],
    }],
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {

    const zonasSaludFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/ZONAS_BASICAS_SALUD_MADRID/FeatureServer/0',
        renderer: renderizadoPoblacion,
        title: ' ',
        popupTemplate: plantillaPopupPoblacion
    })

    const provinciasFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Prov/FeatureServer/0'
    })

    const hospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
    })

    // QUERY
    const peticionQuery = new Query({
        where: "NAMEUNIT = 'Madrid'",
        returnGeometry: true,
        outFields: ['*']
    })

    const resultadoQuery = provinciasFL.queryFeatures(peticionQuery)
    resultadoQuery.then((resultado) => {
        const madrid = resultado.features
        console.log(madrid)

        const peticionQueryGeometry = new Query({
            geometry: madrid[0].geometry,
            spatialRelationship: 'intersects',
            outFields: ['*'],
            returnGeometry: true
        })

        const resultadoQueryGeometry = hospitalesFL.queryFeatures(peticionQueryGeometry)
        resultadoQueryGeometry.then((resultadoFS) => {
            const entidades = resultadoFS.features

            const simbologiaHospitales = new WebStyleSymbol({
                name: "Hospital_POI-Large_3",
                styleUrl: "https://www.arcgis.com/sharing/rest/content/items/11e7b433c72a4cef90c8a428de131147/data"
            });

            const entidadesSimbologiaHospitales = entidades.map((hospital) => {
                hospital.symbol = simbologiaHospitales
                hospital.popupTemplate = plantillaPopupHospitales
                return hospital
            })

            hospitalesMadridGL = new GraphicsLayer({
                graphics: entidadesSimbologiaHospitales,
                title: 'Hospitales de la Comunidad de Madrid'
            })
            console.log(hospitalesMadridGL)
        })
    })
    arcgisMapa.map.add(zonasSaludFL)
})

botonHospitales.addEventListener('click', () => {
    if (!hospitalesMadridGL) {
        return
    }
    
    const capaExiste = arcgisMapa.map.layers.includes(hospitalesMadridGL)

    if (capaExiste) {
        arcgisMapa.map.remove(hospitalesMadridGL)
        botonHospitales.active = false
        return
    }

    arcgisMapa.map.add(hospitalesMadridGL)
    botonHospitales.active = true
})
