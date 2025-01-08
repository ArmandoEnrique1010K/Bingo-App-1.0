import { useState } from 'react'
import { Link } from 'react-router'
// import { useMusic } from '../hooks/useMusic'

type IndexProps = {
    unlockedLevels: number[]
}

export default function IndexPage({ unlockedLevels }: IndexProps) {


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
                    // READY: Este botón debe cubrir toda la pantalla
                    <button
                        className="w-full flex-grow
                        flex items-center justify-center bg-cyan-500 text-white text-2xl font-semibold 
                        hover:bg-cyan-600 active:bg-cyan-700
                        p-4"
                        onClick={showUnlockedLevels}
                    >
                        Iniciar juego
                    </button>
                ) : (<>

                    <div className="w-full max-w-4xl px-4 mb-4">
                        <p className="text-lg text-center mb-6">Seleccione un nivel para empezar</p>
                        {/* Grid para niveles desbloqueados */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                            {
                                unlockedLevels.map((l: number) => (
                                    <Link
                                        key={l}
                                        to={`/level_${l}`}
                                        className="bg-cyan-500 text-white text-center py-4 rounded-md shadow-lg hover:bg-cyan-600 active:bg-cyan-700"
                                    >
                                        Nivel {l}
                                    </Link>
                                ))
                            }
                        </div>


                    </div>
                    {/* <Link to="/level_1">Nivel 1</Link>
                    <Link to="/level_2">Nivel 2</Link>
                    <Link to="/level_3">Nivel 3</Link>
                    <Link to="/level_4">Nivel 4</Link>
                    <Link to="/level_5">Nivel 5</Link>
                    <Link to="/level_6">Nivel 6</Link>
                    <Link to="/level_7">Nivel 7</Link>
                    <Link to="/level_8">Nivel 8</Link>
                    */}
                </>)
            }
        </div>
    )
}
