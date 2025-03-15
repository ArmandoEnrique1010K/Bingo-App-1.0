import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";
import { FINAL_LEVEL } from "../../constants";
import { Modal } from "../../types";
import { Link } from "react-router";

type ModalBaseProps = {
    modal: Modal,
    level: number,
    close: () => void,
    open: () => void,
    isOpen: boolean,
    tryAgain: () => void,
    leaveGame: () => void,
    exit: () => void,
    color?: string
}

export default function ModalBase({ modal, color, level, open, close, isOpen, tryAgain, leaveGame, exit }: ModalBaseProps) {
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
                                {modal.title}
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
                                        level !== FINAL_LEVEL ? (
                                            <Link
                                                className={`w-full py-2 px-4 font-semibold bg-${color}-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300 text-center`}
                                                to={`/level_${level + 1}`} onClick={close}
                                            >
                                                {modal.textButton.left}
                                            </Link>
                                        ) : (
                                            <Button
                                                onClick={exit}
                                                // bg-gray-500
                                                className={`w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg focus:outline-none transition-all duration-300`}
                                            >
                                                {modal.textButton.left}
                                            </Button>
                                        )

                                    ) : (
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
                                        (modal.type === 'victory' && level === FINAL_LEVEL) ||
                                        <Button
                                            onClick={modal.type === 'victory' || modal.type === 'defeat' ? exit : close}
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
