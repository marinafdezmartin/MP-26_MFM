const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");

const arcgisMapa = document.querySelector('arcgis-map')

const hospitalesFL = new FeatureLayer({
    url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/ArcGIS/rest/services/Hospitales/FeatureServer/0'
})

// Nuevo locator

const searchWC = document.querySelector("arcgis-search");
searchWC.addEventListener('arcgisReady', () => {
    searchWC.sources = [{
        layer: hospitalesFL,
        searchFields: ["Nombre", "Municipio", "CODPOSTAL"],
        displayField: "Nombre",
        exactMatch: false,
        outFields: ["Nombre", "Direccion", "Municipio", "Provincia"],
        name: "Hospitales",
        zoomScale: 500000,
        suggestionTemplate: "{Nombre}, {Municipio}",
        placeholder: "Hospital Universitario Puerta de Hierro Majadahonda, Majadahonda"
    }]
})
