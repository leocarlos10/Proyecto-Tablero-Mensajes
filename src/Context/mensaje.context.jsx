import {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const MensajeContext = createContext();

function MensajeProviderWrapper (prop) {

    const [mensajes, setMensajes] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const getHeaders = ()=> {
        return {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem("wst")
        }
    }

    const registrarM = async (mensaje)=>{

        const request = await fetch("/api/mensajes/registrar", {
            method : "POST",
            headers : getHeaders(),
            body : JSON.stringify(mensaje)
        });

        const response = await request.json();

        if(request.status == 401){
            alert(response.respuesta);
        } else if (request.status == 200){
            console.log(response.respuesta);
        } else if(request.status == 500){
            console.log(response.respuesta);
        }
    }

    const obtenerMensajes = async ()=>{

        try {
            const request = await fetch("/api/mensajes/obtener", {
                method : "GET",
                headers : getHeaders(),
            });
    
            const response = await request.json();
    
            if(request.status == 200){
                console.log(response.lista);
                setMensajes(response.lista);
                setLoading(true);
                setError(false);
            } else if(request.status == 401){
                navigate(`/form/${"login"}`);
            } else if(request.status == 500){
                console.log(response.respuesta);
            }
            
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

    const eliminarMensaje = async (id)=>{

        const request = await fetch(`/api/mensajes/eliminar/${id}`,{
            method : "DELETE",
            headers : getHeaders()
        });

        const response = await request.json();

        if(request.status == 200 ){
            console.log(response.respuesta);
            obtenerMensajes();
        } else if(request.status == 401) {
            alert(response.respuesta);
            navigate(`/form/${"login"}`);
        }else if(request.status == 500) {
            console.log(response.respuesta);
        }
    }

    const editarMensaje = async (id,des)=>{

        const request = await fetch(`/api/mensajes/editar/${id}/${des}`,{
            method : "PUT",
            headers : getHeaders()
        })

        const response = await request.json();

        if(request.status == 200){
            console.log(response.respuesta);
            obtenerMensajes();
        }else if(request.status == 401){
            console.log(response.respuesta);
        }else if(request.status == 500){
            console.log(response.respuesta);
        }
    }

    
    return (
        <MensajeContext.Provider value={{
            registrarM, 
            obtenerMensajes,
             mensajes, 
             loading, 
             error,
             eliminarMensaje,
             editarMensaje
             }}>
            {prop.children}
        </MensajeContext.Provider>
    );
}

export {MensajeContext, MensajeProviderWrapper}