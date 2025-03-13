import { useState } from 'react'
import { Link } from 'react-router'

type IndexProps = {
    unlockedLevels: number[]
}

// Pagina de inicio
export default function IndexPage({ unlockedLevels }: IndexProps) {

    const [menuLevels, setMenuLevels] = useState(false)

    return (
        <div className="min-h-full max-h-full flex flex-col items-center bg-gray-800 text-white">
            <h1 className="text-4xl font-bold text-center my-8">BingoApp</h1>
            {
                menuLevels === false ? (
                    <button
                        className="w-full flex-grow
                        flex items-center justify-center bg-cyan-500 text-white text-2xl font-semibold 
                        hover:bg-cyan-600 active:bg-cyan-700
                        p-4"
                        // Al hacer clic, muestra la lista de niveles
                        onClick={() => setMenuLevels(true)}
                    >
                        Iniciar juego
                    </button>
                ) : (
                    <>
                        <div className="w-full max-w-4xl px-4 mb-4">
                            <p className="text-lg text-center mb-6">Seleccione un nivel para empezar</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                                {
                                    // Itera sobre unlockedLevels para mostrar un enlace al nivel...
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
