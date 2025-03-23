import { Outlet } from "react-router";
import CreditsModal from "../components/Menu/CreditsModal";
import MusicButton from "../components/Menu/MusicButton";
import HelpModal from "../components/Menu/HelpModal";

// Representa la barra de menu
export default function Layout() {
  return (
    // Usa un contenedor general de altura completa (h-screen) y asigna dinámicamente el espacio restante al contenedor <main> con flex-grow.
    <div className="flex flex-col min-w-full h-screen">
      <div className="flex flex-row items-center justify-start sm:py-0 py-0 px-8 bg-gray-900 text-white shadow-lg">
        <HelpModal />
        <MusicButton />
        <CreditsModal />
      </div>

      <main className="bg-gray-800 flex-grow">
        {/* Outlet se utiliza para representar las rutas anidadas. Es un marcador de posición que se llena con el contenido de las rutas secundarias. */}
        <Outlet />
      </main>
    </div>
  );
}
