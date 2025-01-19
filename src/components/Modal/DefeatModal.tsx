import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { useNavigate } from 'react-router';

type DefeatModalProps = {
    level: number
    handleSetDefeat: (boolean: boolean) => void
}

// Ventana modal para mostrar en el caso de que el jugador haya perdido el nivel (derrotado por un bot)
export default function DefeatModal({ level, handleSetDefeat }: DefeatModalProps) {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(true);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    // Función para salir del juego
    function exit() {
        navigate('/')
        handleSetDefeat(false)
    }

    // Función para volver a intentar el mismo nivel
    function tryAgain() {
        navigate(`/level_${level}`)
        handleSetDefeat(false)
        close()
    }


    return (
        <>

            {/* En este caso, no hay un botón para abrir la ventana modal, pues esta ventana modal solamente se mostrara si se renderiza */}
            {/* Esta ventana modal no se va a cerrar una vez que se abra, porque en la propiedad onClose tiene la función open */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={open}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                Mejor suerte para la proxima ⛔
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    Uno de los bots te ha ganado. ¿Desea volver a intentar este nivel?
                                </p>
                            </div>

                            {/* Botones para reintentar el nivel y para ir a la pagina de inicio */}
                            <div className="mt-10 flex flex-row gap-4">
                                <Button
                                    onClick={tryAgain}
                                    // Recuerda las pseudoclases de tailwind: hover (el cursor esta 
                                    // sobre el elemento) y active (al hacer clic en el botón)
                                    className="w-full py-2 px-4 font-semibold bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none transition-all duration-300"
                                >
                                    Volver a intentarlo
                                </Button>
                                <Button
                                    onClick={exit}
                                    className="w-full py-2 px-4 font-semibold bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 active:bg-gray-700  focus:outline-none transition-all duration-300"
                                >
                                    Salir al menú
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
