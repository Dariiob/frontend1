import '../../App.css';
import{
  Link,
}from 'react-router-dom'
import axios from 'axios' 
import{useState, useEffect} from 'react'
import URL_SERVIDOR from '../../constante';

function Encuestas() {

  const[encuestas, setEncuestas ] = useState([]);


  const deleteEncuesta = async (id) =>{
      await axios.delete(URL_SERVIDOR +`/encuesta/${id}`).then((response)=> {
      console.log(response.data)
    })
      axios.get(URL_SERVIDOR +'/encuestas').then((response)=> {
      setEncuestas(response.data)
      })
  }

  useEffect(()=>{
  axios.get(URL_SERVIDOR +'/encuestas').then((response)=> {
    //console.log(response.data);
    setEncuestas(response.data)
    })
  },[setEncuestas]);


  return (
    <>
      <div className="container-encuestas-grid">

        <div className="c1-encuestas">
          <Link to='/encuestas/crear'>
            <button className="encuestas-boton">Crear Encuesta</button>
          </Link>
        </div> 
        
        <div className="c2-encuestas-tabla">
          <table className="encuestas-tabla">
              <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCIÓN</th>
                    <th>URL IMG</th>
                    <th>ID USUARIO</th>
                    <th></th>
                    <th>ACCIONES</th>
                  </tr>
              </thead>

              <tbody>
                  {encuestas.map((encuesta, key) => 
                  <tr key={encuesta.id}>
                    <td>{encuesta.id}</td>
                    <td>{encuesta.nombre}</td>
                    <td>{encuesta.descripcion}</td>
                    <td><a href={encuesta.img_url} target="_blank" rel="noreferrer"> url {encuesta.nombre}</a></td>
                    <td>{encuesta.id_usuario}</td>
                
                    <td>
                      <Link to={`encuestas/editar/${encuesta.id}`}>
                        <button>Editar</button>
                      </Link>
                    </td>
                    <td>

                    <button onClick={()=>deleteEncuesta(encuesta.id)}>Eliminar</button></td>
                  
                  </tr>
                  )}
              </tbody>
          </table>
        </div>
                
      </div>

    </>
  );
}
  export default Encuestas;
