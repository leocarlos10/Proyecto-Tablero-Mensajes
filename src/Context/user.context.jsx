import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Este contexto se va a utilizar para manejar el estado de los usuarios */

const UserContext = createContext();

function UserProviderWrapper(props){

    const [nombreC, setNombreC] = useState(()=> localStorage.getItem("nux"));
    const navigate = useNavigate();

    const headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }


    const registrarUsuario = async (user)=>{

        // realizamos la peticion con fetch
        const request = await fetch("/api/usuario/registrar",{
            method : "POST",
            headers : headers,
            body : JSON.stringify(user)
        })

        // parseamos la respuesta
        const response = await request.json();

        // retornamos la respuesta del backend.
        if(request.status == 201){
            console.log(response.respuesta);
            navigate(`/form/${"login"}`)
        } else if (request.status == 500){
           console.log(response.respuesta);
        }
    }

    const loginUsuario = async (user)=>{

        const request = await fetch("/api/usuario/login", {
            method : "POST",
            headers : headers,
            body : JSON.stringify(user)
        })

        const response = await request.json();

        if(request.status == 200){
            localStorage.setItem("wst", response.token);
            localStorage.setItem("nux", response.cuenta );
            localStorage.setItem("iux", response.id)
            setNombreC(response.cuenta);
            navigate("/")
        } else if(request.status == 401){
            alert(response.respuesta);
        }
    }

    const cerrar_sesion = ()=>{
        localStorage.removeItem("wst");
        localStorage.removeItem("nux");
        localStorage.removeItem("iux");
        location.reload();
      }
    


    return (
        <UserContext.Provider value={{registrarUsuario, loginUsuario, nombreC, setNombreC, cerrar_sesion}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext,UserProviderWrapper}