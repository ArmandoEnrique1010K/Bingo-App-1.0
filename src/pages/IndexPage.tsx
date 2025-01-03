import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useMusic } from '../hooks/useMusic'

export default function Index() {

    // Estado para los niveles desbloqueados
    // const [unlockedLevels, setUnlockedLevels] = useState<number[]>([])

    // // Guardalo en un localstorage
    // localStorage.setItem('unlockedLevels', unlockedLevels)

    // Llama al hook useMusic
    const { nameMusic, volume, isPlaying, startMusic, stopMusic, setNameMusic, setVolume } = useMusic()

    useEffect(() => {
        setNameMusic("background")
        setVolume(-15)
        console.log(nameMusic)
        setTimeout(() => {
            stopMusic()
            startMusic()
            console.log("Reproduciendo " + nameMusic)

        }, 2000)

    }, [nameMusic])
    const [menu, setMenu] = useState(false)





    const handleViewMenu = () => {
        setMenu(true)
        startMusic()

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
