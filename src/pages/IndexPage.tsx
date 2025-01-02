import { useState } from 'react'
import { Link } from 'react-router'

export default function Index() {

    // Estado para los niveles desbloqueados
    // const [unlockedLevels, setUnlockedLevels] = useState<number[]>([])

    // // Guardalo en un localstorage
    // localStorage.setItem('unlockedLevels', unlockedLevels)

    const [menu, setMenu] = useState(false)

    const handleViewMenu = () => {
        setMenu(true)
    }

    return (
        <>
            <h1 className='text-4xl text-center'>BingoApp</h1>
            {
                menu === false ? (
                    <button onClick={handleViewMenu}>
                        Iniciar juego
                    </button>
                ) : (<>

                    <p>Ganale a la computadora</p>
                    <p>Seleccione un nivel</p>
                    <Link to="/level_1">Nivel 1</Link>
                    <Link to="/level_2">Nivel 2</Link>
                    <Link to="/level_3">Nivel 3</Link>
                    <Link to="/level_4">Nivel 4</Link>
                    <Link to="/level_5">Nivel 5</Link>
                    <Link to="/level_6">Nivel 6</Link>
                    <Link to="/level_7">Nivel 7</Link>
                    <Link to="/level_8">Nivel 8</Link>
                </>)
            }
        </>
    )
}
