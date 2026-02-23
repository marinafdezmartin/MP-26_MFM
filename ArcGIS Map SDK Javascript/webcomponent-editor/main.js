const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const capaEditableFL = new FeatureLayer ({
    url: 'https://services1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Capa_Editable_/FeatureServer'
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(capaEditableFL)
})