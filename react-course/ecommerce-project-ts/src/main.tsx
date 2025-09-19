import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router'//routing lets us create multiple pages with single html file and according to react documentation we need to put our element in element called BrowserRouter and inside our App compo. we need to add the compo. called Routes
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//definetly check for allowJS from gpt it lets us us jsx files with tsx ones

createRoot(document.getElementById('root')!).render(//"!" is added here to tell typescript that root element definetely exists
  <StrictMode>{/* strictmode is given by react for idempotency means catching bugs or errors by running web twice gpt for more */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
