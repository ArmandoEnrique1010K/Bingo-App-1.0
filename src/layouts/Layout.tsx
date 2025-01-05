import { Outlet } from "react-router";
import Credits from "../components/Credits";
import Music from "../components/Music";
import Help from '../components/Help';

export default function Layout() {


    // Este componente representa la barra de menu
    return (

        <>
            <div className="flex flex-row items-center justify-start py-5 px-12 gap-5 bg-gray-800 text-white shadow-lg">
                <Help />
                <Music />
                <Credits />

            </div>

            <main className="p-6 bg-gray-100 min-h-screen">
                {/* Outlet se utiliza para representar las rutas anidadas. Es un marcador de posición que se llena con el contenido de las rutas secundarias. */}
                <Outlet />
            </main>
        </>
    )
}