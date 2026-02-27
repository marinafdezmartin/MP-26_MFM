const FeatureLayer = await $arcgis.import("@arcgis/core/layers/FeatureLayer.js");

const arcgisMap = document.querySelector('arcgis-map');

arcgisMap.addEventListener('arcgisViewReadyChange', (eventoViewReadyChange) => {

    const centrosAtencionPrimaria = arcgisMap.map.layers.items[0]

    const zonasBasicasSalud = arcgisMap.map.layers.items[1]

    const boton1 = document.createElement("button")
    boton1.innerHTML = arcgisMap.map.layers.items[0].title
    const boton2 = document.createElement("button")
    boton2.innerHTML = arcgisMap.map.layers.items[1].title

    const divBotones = document.getElementsByClassName("capas");
    divBotones.append(boton1);
    divBotones.append(boton2)

    console.log(arcgisMap.map.layers.items[0].url)
    console.log(arcgisMap.map.layers.items[1].url)

})