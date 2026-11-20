import "./CardEjemplo.css";

interface CardProps {
  imagen: string;
  titulo: string;
  parrafo: string;
  boton: string;
}

function Card(props: CardProps) {
  return (
    <div className="general-card">
      <img src={props.imagen} alt="imagen" />
      <h3> {props.titulo} </h3>
      <p> {props.parrafo} </p>
      <button> {props.boton} </button>
    </div>
  );
}

export default Card;
