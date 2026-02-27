
const SceneLayer = await $arcgis.import("@arcgis/core/layers/SceneLayer.js");
const SnowyWeather = await $arcgis.import("@arcgis/core/views/3d/environment/SnowyWeather.js");

const arcgisScene = document.querySelector('arcgis-scene');

arcgisScene.addEventListener('arcgisViewReadyChange', (eventoViewReadyChange) => {
    const edificiosSL = new SceneLayer({
        portalItem: {
            id: "c444b24b184c4523a5dc96248bfea4e1"
        },
    })
    arcgisScene.map.add(edificiosSL)

    arcgisScene.environment.weather = new SnowyWeather

    const boton = document.createElement('button')
    boton.innerHTML = 'Santiago Bernabeu'
    document.body.appendChild(boton);

    boton.addEventListener('click', (eventoClick) => {
        arcgisScene.goTo({
            center: [-3.68865, 40.45306],
            zoom: 18,
            tilt: 45
        })
    });
})