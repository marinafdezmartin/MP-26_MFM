import './AplicacionArcGIS.css'

interface AplicacionArcGISProps{
    titulo: string
    descripcion: string
    enlace: string
    textoEnlace: string
}

function AplicacionArcGIS(props:AplicacionArcGISProps) {
    return (
        <div className='aplicacion-arcgis'>
            <img src="https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?semt=ais_rp_progressive&w=740&q=80" alt="logo" />
            <div>
                <p>{props.titulo}</p>
                <p>{props.descripcion}</p>
                <a href={props.enlace}>{props.textoEnlace}</a>
            </div>
        </div>
    )
}

export default AplicacionArcGIS