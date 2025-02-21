import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProviderWrapper } from './Context/user.context.jsx'
import { MensajeProviderWrapper } from './Context/mensaje.context.jsx'


/* la etiqueta del router debe ir fuera para poder hacer uso de sus hooks 
  en los contextos.
*/

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <MensajeProviderWrapper>
        <UserProviderWrapper>
          <App />
        </UserProviderWrapper>
      </MensajeProviderWrapper>
    </BrowserRouter>,
)


