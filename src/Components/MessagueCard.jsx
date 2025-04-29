import { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { MensajeContext } from "../Context/mensaje.context";
import EditModal from "./EditModal";
import ReactDOM from "react-dom";

function MessagueCard({mensaje}) {

    const {eliminarMensaje} = useContext(MensajeContext);
    const [mostrarModal , setMostrarModal] = useState(false);

  return (
    <div className="exampleMesague"  key={mensaje.id}>
        <img src="avatar.jpeg" alt="" width={32} height={32} />
        <div className="contenido">
            <p className='cuenta'>{mensaje.cuenta}</p>
            <p className='descripcion'>{mensaje.descripcion}</p>
        </div>
        <div className="cont-icons">
            <div className="cont-edit"  onClick={()=> setMostrarModal(true)}>
                <FiEdit/>
            </div>
            <div className="cont-eliminar" onClick={()=> eliminarMensaje(mensaje.id)}>
                <FiTrash2/>                  
            </div>
        </div>

        {/* Hacemos uso de ReactDOM para crear un portal
            este recibe dos parametros lo que va renderizar, el elemento 
            donde lo va a renderizar.
        */}
        {mostrarModal && 
            ReactDOM.createPortal(<EditModal estado = {setMostrarModal} id = {mensaje.id} des = {mensaje.descripcion}/>,document.body)
        }
    </div>
  )
}

export default MessagueCard