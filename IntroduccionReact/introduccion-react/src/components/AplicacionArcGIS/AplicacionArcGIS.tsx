import { useState } from "react";
import "./AplicacionArcGIS.css";
import Card from "./CardEjemplo/CardEjemplo";

interface AplicacionArcGISProps {
  titulo: "EXPERIENCE BUILDER" | "STORY MAPS";
  descripcion: string;
  enlace: string;
  textoEnlace: string;
}

function AplicacionArcGIS(props: AplicacionArcGISProps) {
  // funcion de estado
  //   let [variable que almacena la info, funcion que actualiza el valor] = useState ('valor inicial')
  const [estadoBoton, setEstadoBoton] = useState(false);

  // creo variable
  let ejemplosRenderizados;

  // si el titulo
  if (props.titulo === "EXPERIENCE BUILDER" && estadoBoton) {
    ejemplosRenderizados = (
      <>
        <div>
          <Card
            imagen={
              "https://resource.esriuk.com/wp-content/uploads/Blog_BM_Jun22-organisational-template.png"
            }
            titulo={"1"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
        <div>
          <Card
            imagen={
              "https://developers.arcgis.com/experience-builder/assets/img/featured_apps/covid19-chile.jpg"
            }
            titulo={"2"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
        <div>
          <Card
            imagen={
              "https://gisgeography.com/wp-content/uploads/2022/04/ArcGIS-Experience-Builder-Use-Case-1265x604.png"
            }
            titulo={"3"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
      </>
    );
  }
  if (props.titulo === "STORY MAPS" && estadoBoton) {
    ejemplosRenderizados = (
      <>
        <div>
          <Card
            imagen={
              "https://www.esri.com/about/newsroom/app/uploads/2018/09/0513-tip1.jpg"
            }
            titulo={"1"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
        <div>
          <Card
            imagen={
              "https://cdn.arcgis.com/sharing/rest/content/items/c75fd3c46d9e4bc3a8bfbe1504dee2d3/resources/wxp8vaGRNzQNCL2CGzRfV.jpeg?w=1200"
            }
            titulo={"2"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
        <div>
          <Card
            imagen={
              "https://www.cambridgema.gov/-/media/Images/GIS/embeddedmapthumbnails/Storymaps/CambridgeStoryMap_MapAfroAmerHistTrail.jpg?mw=500"
            }
            titulo={"3"}
            parrafo={""}
            boton={""}
          ></Card>
        </div>
      </>
    );
  }

  function buttonHandler() {
    if (estadoBoton) {
      setEstadoBoton(false);
    }
    if (estadoBoton == false) {
      setEstadoBoton(true);
    }
  }

  // Renderizacion del componente
  return (
    <>
      <div className="aplicacion-arcgis">
        <img
          src="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?semt=ais_rp_progressive&w=740&q=80"
          alt="logo"
        />
        <div className="descripcion-app">
          <p>{props.titulo}</p>
          <p>{props.descripcion}</p>
          <a href={props.enlace}>{props.textoEnlace}</a>
          <button onClick={buttonHandler}>Ver ejemplos</button>
        </div>
      </div>
      <div className="card-app">{ejemplosRenderizados}</div>
    </>
  );
}

export default AplicacionArcGIS;
