const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");
const PopupTemplate = await $arcgis.import("@arcgis/core/PopupTemplate.js");

const arcgisMapa = document.querySelector('arcgis-map')


// Plantilla - PopupTemplate
const plantillaPopup = new PopupTemplate({
    title: "{Nombre}, {Municipio}",
    content: [{
            type: "fields",  // autocast
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

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0',
    popupTemplate: plantillaPopup
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(hospitalesFL)
})
