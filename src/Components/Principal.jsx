
import { FiSend } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from "react";
import { MensajeContext } from "../Context/mensaje.context";
import "../css/spinner.css"
import EditModal from "./EditModal";
import MessagueCard from "./MessagueCard";


function Principal() {

  const {registrarM, obtenerMensajes, mensajes, loading, error} = useContext(MensajeContext);
  const containerMref = useRef(null);
  const textareaRef = useRef(null);

    const [mensaje, setMensaje] = useState({
        descripcion : '',
        id_usuario : 0
    });

    /* obtiene los mensajes al momento en que se monta el componente. */
    useEffect(()=>{
      obtenerMensajes(localStorage.getItem("wst"));
    },[]);

    

    /* esta funcion captura las descripcion, 
        ademas agregamos una limitacion de caracteres*/
    const HandleDescripcion = (e)=>{
      if(e.target.value.length <= 200){
        setMensaje({...mensaje, descripcion : e.target.value});
        textareaRef.current.style.height = "auto"; // Restablecer altura
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // Ajustar a contenido
      }
    }

    /* esta funcion es la que se ejecuta cuando el usuario realiza click 
      en el boton enviar luego realiza la carga del objeto mensaje y las verificaciones
      necesarias para registrarlo en el backend
    */
    const HandleRegistrarM = (e)=>{

      e.preventDefault();
      const id_user = localStorage.getItem("iux");

      if(id_user){
        const newMensaje = {...mensaje, id_usuario : Number(id_user) }

        if(mensaje.descripcion){
          if (!isNaN(mensaje.id_usuario)){

            // aqui si realizamos la peticion para registrar el mensaje
              registrarM(newMensaje);
              setMensaje({ 
                descripcion : '',
                id_usuario : 0})
                location.reload();
          }else{
            console.log(`Error al parsear el id ${isNaN(mensaje.id_usuario)}`);
          }
        }else{
          alert("Revisa que los campos no esten vacios")
        }
      }

    }

    /* esta variable recorre el array de mensajes que obtengo desde el backend
        y utiliza el componenete de MessagueCard para cargar los mensajes
    */
    const cont_mensajes = mensajes.map((mensaje, index)=>{
        return (
          <MessagueCard key={mensaje.id } mensaje = {mensaje}/>   
        )
      })


  return (  
   <main className='main'>
        <div className="cont-pri">
            <h4>Mensajes</h4>
            <div className="cont-mensaje" ref={containerMref}>
              {
                error ? 
                    <h2>Tenemos un Error, por favor ingrese mas tarde</h2> 
                : !loading ?
                  <div className="spinner-container">
                    <div className="spinner"></div>
                  </div>
                : mensajes.length > 0 ? 
                  cont_mensajes
                :
                  <h2>No hay mensajes disponibles</h2>
              }
            </div>
              <form action="#">
                <div className="cont-envio-mensaje">
                  <textarea 
                  rows={1} 
                  placeholder='Mensaje' 
                  required 
                  id='mensaje' 
                  value={mensaje.descripcion}
                  onChange={HandleDescripcion}
                   ref={textareaRef}/>
                  <button id='btn-enviar' onClick={HandleRegistrarM} ><FiSend/></button>
                </div>
              </form>
        </div>
    </main>
  )
}

export default Principal