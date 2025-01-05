import { useState } from 'react'
import { Link } from 'react-router'
// import { useMusic } from '../hooks/useMusic'

type IndexProps = {
    unlockedLevels: number[]
}

export default function IndexPage({ unlockedLevels }: IndexProps) {


    const [menuLevels, setMenuLevels] = useState(false)

    // Función para mostrar el menú principal
    const showUnlockedLevels = async () => {
        setMenuLevels(true)
    }

    return (
        <>
            <h1 className='text-4xl text-center'>BingoApp</h1>
            {
                // menu === false && nameMusic ? (

                menuLevels === false ? (
                    <button onClick={showUnlockedLevels}>
                        Iniciar juego
                    </button>
                ) : (<>

                    <p>Ganale a la computadora</p>
                    <p>Seleccione un nivel</p>

                    {/* Solamente mostrara los niveles desbloqueados */}
                    {
                        unlockedLevels.map((l: number) => (
                            <Link key={l}
                                to={`/level_${l}`}>Nivel {l}</Link>
                        ))
                    }
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
        </>
    )
}
