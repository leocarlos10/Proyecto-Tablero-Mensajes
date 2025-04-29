import { useContext, useEffect, useRef, useState } from 'react'
import { FiMoon } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import '../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { use } from 'react';
import { UserContext } from '../Context/user.context';

function Header() {

  /* Contexto del Usuario. */
  const { nombreC, cerrar_sesion } = useContext(UserContext);
  //variable que ayuda a manipular el estado del panel.
  const [isvisible, setIsVisible] = useState(false);
  const panelRef = useRef(null);

  useEffect(()=>{
    // creamos la funcion que oculta el panel verificando lo siguiente
    
    /*  panelRef.current - verificando que no sea null
        !Panel.current.contains(event.target) - que el click haya sido fuera 
        del panel - el ! es porque si fue dentro devulve true y si fue fuera devuelve 
        false y necesitamos negarlo para que ingrese en el condicional
     */
    function handleClickOutside(event) {
      if(panelRef.current && !panelRef.current.contains(event.target)){
        setIsVisible(false);
      }
    }

    /* agregamos el event listener cuando el panel esta visible */
    if(isvisible){
      document.addEventListener("mousedown", handleClickOutside);
    }

    /* cuando el elemento se desmonte simplemente quitamos el evento */
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    }

  }, [isvisible]);

  const PanelToggle = ()=>{
    setIsVisible( !isvisible)
  }

  
  return (
    <header className='header'>
        <h2 className='title'>Tablero de mensajes</h2>
        <nav className='nav'>
            <ul>
                <li className='item'>
                    <button className='btn-black'>
                      <FiMoon/>
                       modo oscuro 
                    </button>
                    <div className="cont-avatar">
                      <div className="cont-user">
                        <img src='./avatar.jpeg' width={32} className='img'  onClick={PanelToggle} ></img>
                        {nombreC && <span>{nombreC}</span>}
                      </div>
                      {/* utilizamos una variable de estado para mostrar u ocultar el panel */}
                      {isvisible && 
                      <div className="panel" ref={panelRef}>
                        <Link to={`/form/${"login"}`} className='link link-style'  > <FiLogIn/> iniciar sesion</Link>
                        <div className="separetor"></div>
                        <Link to={`/form/${"registro"}`} className='link link-style'><FiPlus/>Registrarse</Link>
                        <div className="separetor"></div>
                        <Link to={"/"} className='link link-style' onClick={cerrar_sesion}> <FiLogOut/> cerrar sesion</Link>
                      </div>
                      }
                    </div>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header