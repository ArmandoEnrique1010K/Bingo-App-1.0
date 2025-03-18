import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { FINAL_LEVEL } from "../../constants";
import { Modal } from "../../types";
import { Link } from "react-router";
import { BingoContext } from "../../context/BingoContext";
import { useContext } from "react";

type ModalBaseProps = {
    modal: Modal,
    close: () => void,
    open: () => void,
    isOpen: boolean,
    tryAgain: () => void,
    leaveGame: () => void,
    nextLevel: () => void,
    closeAndPlayMusic: () => void
}

export default function ModalBase({ modal, open, close, isOpen, tryAgain, leaveGame, nextLevel, closeAndPlayMusic }: ModalBaseProps) {

    const { color, currentLevel } = useContext(BingoContext)

    return (
        <>
            {/* Si se trata de una ventana modal de tipo victoria o derrota no se va a poder cerrar la ventana modal al hacer clic fuera de ella, si es de tipo exit si lo va a poder cerrar */}
            {/* TODO ARREGLAR ESTO */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={modal.type === 'victory' || modal.type === 'defeat' ? open : close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                {modal.title} {modal.type === 'start' && currentLevel}
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    {modal.message}
                                </p>
                            </div>

                            {/* Botones para reintentar el nivel y para ir a la pagina de inicio */}
                            <div className="mt-10 flex flex-row gap-4">

                                {
                                    modal.type === 'victory' ? (

                                        // NO DEBE MOSTRAR ESTE BOTÓN SI ESTA EN EL NIVEL FINAL (20)
                                        currentLevel !== FINAL_LEVEL ? (
                                            <Link
                                                className={`w-full py-2 px-4 font-semibold bg-${color}-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300 text-center`}
                                                to={`/level_${currentLevel + 1}`} onClick={nextLevel}
                                            >
                                                {modal.textButton.left}
                                            </Link>
                                        ) : (
                                            <Button
                                                onClick={leaveGame}
                                                // bg-gray-500
                                                className={`w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300`}
                                            >
                                                {modal.textButton.left}
                                            </Button>
                                        )

                                    ) : (modal.type === 'start') ? (
                                        <Button
                                        onClick={closeAndPlayMusic}
                                        // bg-gray-500
                                        className={`w-full py-2 px-4 font-semibold bg-${
                                            color}-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300`}
                                    >
                                        {modal.textButton.left}
                                    </Button>

                                    )
                                    
                                    : (
                                        <Button
                                            onClick={modal.type === 'defeat' ? tryAgain : leaveGame}
                                            // Recuerda las pseudoclases de tailwind: hover (el cursor esta 
                                            // sobre el elemento) y active (al hacer clic en el botón)
                                            className={`w-full py-2 px-4 font-semibold bg-${color}-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300`}
                                        >
                                            {modal.textButton.left}
                                        </Button>

                                    )

                                }


                                {
                                    (
                                        (modal.type === 'victory' && currentLevel === FINAL_LEVEL) || (modal.type === 'start') ||
                                        <Button
                                            onClick={modal.type === 'victory' || modal.type === 'defeat' ? leaveGame : close}
                                            className={`w-full py-2 px-4 font-semibold bg-gray-500  text-white rounded-lg text-lg focus:outline-none transition-all duration-300`}
                                        >
                                            {modal.textButton.right}
                                        </Button>

                                    )

                                }
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>
    )
}
