import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ModalBase from "./ModalBase";
import { BingoContext } from "../../context/BingoContext";
import { Modal } from "../../types";

type ModalWithButtonProps = {
    modal: Modal,
    initialState: boolean
}

// COMPONENTE PARA MOSTRAR LA VENTANA MODAL CON HEADLESS UI
export default function ModalWithButton(
    { modal, initialState }: ModalWithButtonProps
) {

    // Llama al contexto
    const { handleCheckWinnerPattern, setWinner, color, currentLevel, setCurrentLevel } = useContext(BingoContext)

    // Estado para ver la ventana modal
    const [isOpen, setIsOpen] = useState(initialState);

    const navigate = useNavigate()

    // Abrir ventana
    function open() {
        setIsOpen(true)
    }

    // Cerrar ventana
    function close() {
        setIsOpen(false)
    }

    // Reintentar el nivel actual
    function tryAgain() {
        navigate(`/level_${currentLevel}`)
        setWinner('none');
        // handleSetDefeat(false)
        close()
    }

    // Comprobar si el jugador gano
    function check() {
        if (handleCheckWinnerPattern() === true) {
            setWinner('player')
            open()
        } else {
            console.log('AUN NO HA GANADO EL JUGADOR')
        }
    }

    // Salir del juego
    function leaveGame() {
        close()
        navigate('/')
        setWinner('')
    }

    // Siguiente nivel
    function nextLevel() {
        close()
        navigate(`/level_${currentLevel + 1}`)
        setCurrentLevel(l => l + 1)
        // resetLevel()
        setWinner('none')
    }

    return (
        <>
            {/* Ejecuta la acción de acuerdo al tipo de modal */}
            {
                modal.type === 'victory' ? (
                    <button onClick={check} className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}>Comprobar patrón</button>
                ) : modal.type === 'exit' ? (
                    <button onClick={open} className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}>Abandonar partida</button>
                ) : ('')
            }
            <ModalBase modal={modal} open={open} close={close} isOpen={isOpen} tryAgain={tryAgain} leaveGame={leaveGame} nextLevel={nextLevel} />
        </>
    )
}
