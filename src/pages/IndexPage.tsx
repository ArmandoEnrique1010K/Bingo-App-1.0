import { useState } from 'react'
import { Link } from 'react-router'

type IndexProps = {
    // Arreglo de niveles desbloqueados
    unlockedLevels: number[]
}

// Componente para la pagina de inicio
export default function IndexPage({ unlockedLevels }: IndexProps) {

    // Estado para mostrar los niveles
    const [menuLevels, setMenuLevels] = useState(false)

    // Función para mostrar el menú principal
    const showUnlockedLevels = () => {
        setMenuLevels(true)
    }

    return (
        <div className="min-h-full max-h-full flex flex-col items-center bg-gray-800 text-white">
            <h1 className="text-4xl font-bold text-center my-8">BingoApp</h1>
            {
                menuLevels === false ? (
                    // Este botón debe cubrir toda la pantalla, al hacer clic en el mostrara los niveles desbloqueados
                    <button
                        className="w-full flex-grow
                        flex items-center justify-center bg-cyan-500 text-white text-2xl font-semibold 
                        hover:bg-cyan-600 active:bg-cyan-700
                        p-4"
                        onClick={showUnlockedLevels}
                    >
                        Iniciar juego
                    </button>
                ) : (
                    <>
                        <div className="w-full max-w-4xl px-4 mb-4">
                            <p className="text-lg text-center mb-6">Seleccione un nivel para empezar</p>
                            {/* Grid para niveles desbloqueados */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                                {
                                    // Itera sobre unlockedLevels y muestra un enlace para acceder al nivel desbloqueado
                                    unlockedLevels.map((level: number) => (
                                        <Link
                                            key={level}
                                            to={`/level_${level}`}
                                            className="bg-cyan-500 text-white text-center py-4 rounded-md shadow-lg hover:bg-cyan-600 active:bg-cyan-700"
                                        >
                                            Nivel {level}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
