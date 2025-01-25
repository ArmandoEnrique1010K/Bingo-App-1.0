import { Outlet } from "react-router";
import Credits from "../components/Menu/Credits";
import Music from "../components/Menu/Music";
import Help from '../components/Menu/Help';

export default function Layout() {

    // Este componente representa la barra de menu
    return (

        // Usa un contenedor general de altura completa (h-screen) y asigna dinámicamente el espacio restante al contenedor <main> con flex-grow.
        <div className="flex flex-col min-w-full h-screen">
            <div className="flex flex-row items-center justify-start sm:py-0 py-0 px-8 bg-gray-900 text-white shadow-lg">
                <Help />
                <Music />
                <Credits />
            </div>

            {/* Aplica un color de fondo a todo el contenido */}
            <main className="bg-gray-800 flex-grow">
                {/* Outlet se utiliza para representar las rutas anidadas. Es un marcador de posición que se llena con el contenido de las rutas secundarias. */}
                <Outlet />
            </main>
        </div>
    )
}