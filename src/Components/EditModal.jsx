import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import "../css/editmodal.css"
import { useContext, useRef, useState } from "react";
import { MensajeContext } from "../Context/mensaje.context";

function EditModal({estado, id, des}) {

    const {editarMensaje} = useContext(MensajeContext);
    const textareaRef = useRef(null);

    const [mensaje, setMensaje] = useState({
        id_mensaje : id,
        des_mensaje : des
    });


    const HandleDescripcion = (e)=>{
        if(e.target.value.length <= 200){
          setMensaje({...mensaje, des_mensaje : e.target.value});
          textareaRef.current.style.height = "auto"; // Restablecer altura
          textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // Ajustar a contenido
        }
      }

    const HandleEditar = (e)=>{
        e.preventDefault();
        if(mensaje.id_mensaje || mensaje.descripcion){
            editarMensaje(mensaje.id_mensaje,mensaje.des_mensaje);
            estado(false)
        }
    }

      /* cuando el usuario de click en el div modal manda al estado false y cierra el modal */
      const cerrarModal = (e)=>{
        if(e.target.classList.contains("modal")){
            estado(false);
        }
      }

  return (
    <div className='modal' onClick={cerrarModal}>
        <div className="modal-content">
            <div className="cont-cerrar">
                <div className="cerrar" onClick={()=> estado(false)}><FiX/></div>
            </div>
            <div className="cont-encabezado">
                <h2 className="info-titulo">Editar mensaje</h2>
            </div>
        <form action="#" className="form-edit">
        <img src="avatar.jpeg" alt="" width={32} height={32} />
            <textarea 
            rows={2} 
            id="mensaje"
            required
            value={mensaje.des_mensaje}
            onChange={HandleDescripcion}
            />
            <button id='btn-editar' onClick={HandleEditar}><FiCheck/></button>
        </form>
        </div>
    </div>
  )
}

export default EditModal