import { useState } from "react";
import { useNavigate } from "react-router";
import ModalBase from "./ModalBase";
import { Modal } from "../../types";

type ModalWithButtonProps = {
    modal: Modal,
    level: number,
    handleCheckWinnerPattern: () => boolean,
    handleSetDefeat: (boolean: boolean) => void,
    initialState: boolean
    color?: string
}

// COMPONENTE PARA MOSTRAR LA VENTANA MODAL CON HEADLESS UI
export default function ModalWithButton({ color, modal, level, handleCheckWinnerPattern, handleSetDefeat, initialState }: ModalWithButtonProps) {


    // ESTADO PARA ABRIR Y CERRAR
    const [isOpen, setIsOpen] = useState(initialState);
    const navigate = useNavigate()

    // FUNCIONES PARA ABRIR Y CERRAR LA VENTANA MODAL
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    // SALIR DEL JUEGO
    function exit() {
        navigate('/')
        handleSetDefeat(false)
    }

    // VOLVER A INTENTAR EL MISMO NIVEL
    function tryAgain() {
        navigate(`/level_${level}`)
        handleSetDefeat(false)
        close()
    }

    // COMPROBAR SI EL JUGADOR HA GANADO
    function check() {
        if (handleCheckWinnerPattern() === true) {
            // Abre la ventana modal
            setIsOpen(true)
        }
    }
    // Función para salir del juego, redirige hacia el endpoint '/'
    function leaveGame() {
        setIsOpen(false)
        navigate('/')
    }

    return (
        <>
            {/* Ejecuta la acción de acuerdo al tipo de modal, simplificar esto */}
            {
                modal.type === 'victory' ? (
                    <button onClick={check} className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}>Comprobar patrón</button>
                ) : modal.type === 'exit' ? (
                    <button onClick={open} className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}>Abandonar partida</button>
                ) : ('')

            }

            <ModalBase color={color} modal={modal} level={level} open={open} close={close} isOpen={isOpen} tryAgain={tryAgain} leaveGame={leaveGame} exit={exit} />
        </>
    )
}
