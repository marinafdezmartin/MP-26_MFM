const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");

const arcgisMapa = document.querySelector("arcgis-map");
const swipe = document.querySelector("arcgis-swipe");

const naturalITL = new ImageryTileLayer({
    url: "https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer",
    bandIds: [3, 2, 0],
    effect: "brightness(300%) contrast(140%) saturate(150%)"
})

const geoITL = new ImageryTileLayer({
    url: "https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer",
    bandIds: [11, 10, 1],
    effect: "brightness(300%) contrast(140%) saturate(150%)"
})


arcgisMapa.addEventListener("arcgisViewReadyChange", () => {
    arcgisMapa.map.addMany([geoITL, naturalITL])

    swipe.startLayers = [naturalITL]
    swipe.endLayers = [geoITL]
})