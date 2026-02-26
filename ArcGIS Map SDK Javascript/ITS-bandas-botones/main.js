const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");

const arcgisMapa = document.querySelector("arcgis-map");
const btnNatural = document.getElementById("btn-natural");
const btnGeo = document.getElementById("btn-geo");

const incendioITL = new ImageryTileLayer({
    url: "https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer",
    bandIds: [3, 2, 0],
    effect: "brightness(300%) contrast(140%) saturate(150%)"
})


arcgisMapa.addEventListener("arcgisViewReadyChange", () => {
    arcgisMapa.map.add(incendioITL),
        console.log(incendioITL),

        btnNatural.addEventListener("click", () => {
            incendioITL.bandIds = [3, 2, 0]
        }),

        btnGeo.addEventListener("click", () => {
            incendioITL.bandIds = [11, 10, 1]
        })
})


