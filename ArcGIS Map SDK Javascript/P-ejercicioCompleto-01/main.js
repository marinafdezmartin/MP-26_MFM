const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const ClassBreaksRenderer = await $arcgis.import("@arcgis/core/renderers/ClassBreaksRenderer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const renderizadoCenso = new ClassBreaksRenderer ({
    field: 'Poblacion',
    classBreakInfos: [{

    }]
})

const censoFL = new FeatureLayer ({
url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/CensoAnual2023_SeccionCensal2023Continua/FeatureServer',
})

const transporteFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Transportes_y_comunicaciones_en_la_Comunidad_de_Madrid_WFL1/FeatureServer/10'
})

const gimnasiosFL = new FeatureLayer ({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Servicios_culturales__recreativos_y_personales_en_la_Comunidad_de_Madrid_WFL1/FeatureServer/12'
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(censoFL)
    arcgisMapa.map.add(transporteFL)
    arcgisMapa.map.add(gimnasiosFL)
})