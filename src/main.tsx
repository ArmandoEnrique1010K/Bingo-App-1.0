import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// https://platzi.com/clases/3578-npm/52462-eliminacion-de-dependencias-y-package-lock/
// Elimina una dependencia con el comando: npm uninstall 
// En este caso: sweetalert con el mismo comando para instalarlo, pero utilizando npm uninstall sweetalert2
// Conviene usar HeadlessUI en lugar de SweetAlert2