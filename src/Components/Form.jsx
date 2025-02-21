
import { Link, useParams } from 'react-router-dom'
import "../css/form.css"
import { useContext, useRef } from 'react';
import { UserContext } from '../Context/user.context';

/*  Antes de renderizar el formulario
    debemos verificar que formulario se va a mostrar 
    si el de login o el de registro
*/

function Form() {
    /* Estoy obteniendo el tipo de formulario a mostrar desde la url */
    const {tipo} = useParams();
    /* variables para obtener los datos del form */
    const cuenta = useRef();
    const pass = useRef();
    // uso del contexto de usuario
    const {registrarUsuario, loginUsuario, setNombreC} = useContext(UserContext);
    // una funcion que muestra una alerta.
    const alerta = ()=> alert("Campos vacios, Por favor intente de nuevo ");

    const HandleSubmitSingUp = (e)=>{

        e.preventDefault();

        const data = {
            cuenta : cuenta.current.value,
            pass : pass.current.value
        }

        if(data.cuenta && data.pass){
            registrarUsuario(data);
        }else{
            alerta();
        }
    }

    /*  Sabiendo que la funcion loginUsuario solo retorna algo
        en caso de que el usuario no se logre loguear
        por eso usamos ! para asegurarnos de que ingrese en el condiconal
    */
    const HandleSubmitLogin = (e)=>{
        e.preventDefault();

        const data = {
            cuenta : cuenta.current.value,
            pass : pass.current.value
        }

        if(data.cuenta && data.pass){
             loginUsuario(data);
        }else{ 
            alerta();
        }
    }

  return (
    <div className='cont-form'>
     <form className='form' >
           <Titulos tipo = {tipo} />
            <div className="cont-inputs">
                    <input type="text" placeholder="cuenta" id="cuenta" ref={cuenta} />
                    <input type="password" name="" id="pass" placeholder='Password' ref={pass}/>
                    <Boton tipo={tipo} evento_registrar = {HandleSubmitSingUp} evento_login = {HandleSubmitLogin}/>
            </div>
            <div className="cont-registro">
              <Enlaces tipo = {tipo}/>  
            </div>
        </form>
    </div>
  )
}

export default Form

// componente para los titulos 
function Titulos ({tipo}){
    return (
        <>
        {tipo == "login" ? (
                <div className="cont-titulo">
                    <h2 className='titulo'>Inicio de sesion</h2>
                    <h5 className='des'>Bienvenido, Porfavor inicie sesion para continuar</h5>
                </div>
            ):(
                <div className="cont-titulo">
                    <h2 className='titulo'>Registro</h2>
                    <h5 className='des'>Bienvenido, Porfavor Registrese para continuar</h5>
                </div>
            )}
        </> 
    )
}

// componente para los botones
/* recibe un prop que contiene el tipo
    y los eventos a ejecutar
 */
function Boton({tipo, evento_registrar, evento_login }){
    return (
        <>
        {tipo == "login" ? 
        (
            <button className='btn' onClick={evento_login}>Sing in</button>
        ):(
            <button className='btn' onClick={ evento_registrar}>Sign up</button>
        )}
        </> 
    )
}

// componente para los enlaces
function Enlaces({tipo}){
    return (
        <>
        {tipo == "login" ? (
            <label htmlFor=""  className='enlace'>
                No te has registrado ?
                <Link to={`/form/${"registro"}`} className='link-style link-registro '>Registrate aqui </Link>
            </label>
            ):(
                <label htmlFor="" className='enlace' >
                     Ya tienes una cuenta ?
                     <Link to={`/form/${"login"}`} className='link-style link-login '>Inicia sesion</Link>
                </label>
            )}
        </> 
    )
}




