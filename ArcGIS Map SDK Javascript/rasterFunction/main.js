const ImageryTileLayer = await $arcgis.import("@arcgis/core/layers/ImageryTileLayer.js");
const RasterFunction = await $arcgis.import("@arcgis/core/layers/support/RasterFunction.js");


const arcgisMapa = document.querySelector('arcgis-map')

const funcionNDVI = new RasterFunction({
    functionName: 'NDVI',
    functionArguments: {
        VisibleBandID: 3,
        InfraredBandID: 7
    }
})

const funcionNDVIColor = new RasterFunction({
    functionName: 'Colormap',
    functionArguments: {
        colormapName: 'NDVI3',
        raster: funcionNDVI
    }
});

const incendioITL = new ImageryTileLayer({
    url: 'https://tiledimageservices1.arcgis.com/MPSkeshhtFz9vjCL/arcgis/rest/services/Imagen_Incendio_Canarias___Sentinel_2/ImageServer',
    rasterFunction: funcionNDVIColor,
    effect: "saturate(150%)"
})

arcgisMapa.addEventListener('arcgisViewReadyChange', () => {
    arcgisMapa.map.add(incendioITL)
    console.log(incendioITL)
})