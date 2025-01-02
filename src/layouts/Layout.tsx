import { Outlet } from "react-router";
import Credits from "../components/Credits";
import Music from "../components/Music";

export default function Layout() {

    // Este componente representa la barra de menu
    return (

        <>
            <Credits />
            <Music />

            <main>
                {/* Outlet se utiliza para representar las rutas anidadas. Es un marcador de posición que se llena con el contenido de las rutas secundarias. */}
                <Outlet />
            </main>
        </>
    )
}