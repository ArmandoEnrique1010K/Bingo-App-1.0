import { Outlet } from "react-router";
import Credits from "../components/Menu/Credits";
import Music from "../components/Menu/Music";
import Help from '../components/Menu/Help';

export default function Layout() {


    // Este componente representa la barra de menu
    return (

        // Usa un contenedor general de altura completa (h-screen) y asigna dinámicamente el espacio restante al contenedor <main> con flex-grow.
        <div className="flex flex-col h-screen">
            <div className="flex flex-row items-center justify-start py-5 px-12 gap-5 bg-gray-800 text-white shadow-lg">
                <Help />
                <Music />
                <Credits />
            </div>

            <main className="p-6 bg-gray-100 flex-grow">
                {/* Outlet se utiliza para representar las rutas anidadas. Es un marcador de posición que se llena con el contenido de las rutas secundarias. */}
                <Outlet />
            </main>
        </div>
    )
}