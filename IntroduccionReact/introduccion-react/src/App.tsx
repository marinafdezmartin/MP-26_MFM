
import './App.css'
import AplicacionArcGIS from './components/AplicacionArcGIS/AplicacionArcGIS'


function App() {

  return (
    <>
      <h1>Crear un componente</h1>
      <AplicacionArcGIS titulo={'EXPERIENCE BUILDER'} descripcion={'Descripción del Experience Builder'} enlace={'https://react.dev/'} textoEnlace={'Documentación'}></AplicacionArcGIS>
      <AplicacionArcGIS titulo={'STORY MAPS'} descripcion={'Descripción del Story Maps'} enlace={'https://react.dev/'} textoEnlace={'Documentación'}></AplicacionArcGIS>
    </>
  )
}



export default App
