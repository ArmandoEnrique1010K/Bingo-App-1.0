import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router';

type VictoryModalProps = {
    level: number
    handleCheckWinnerPattern: () => boolean
}

// Ventana modal para mostrar que el jugador ha ganado el nivel
export default function VictoryModal({ level, handleCheckWinnerPattern }: VictoryModalProps) {

    // Repite el mismo procedimiento definido en LeaveModal
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    // Redirige hacia la página de inicio
    function exit() {
        navigate('/')
    }

    // Verifica si el jugador tiene el patrón ganador en su tablero
    function check() {
        if (handleCheckWinnerPattern() === true) {
            // Abre la ventana modal
            setIsOpen(true)
        }
    }

    return (
        <>
            {/* Botón para comprobar el patrón ganador (al hacer clic en el llama a la función check)  */}
            <button onClick={check} className='bg-cyan-500 text-white font-semibold px-6 sm:py-3 py-2 rounded-lg shadow-black shadow-md 
                hover:bg-cyan-600 active:bg-cyan-700 transition duration-300 sm:text-base text-sm'>Comprobar patrón</button>

            {/* En la propieda onClose se define la función para abrir la ventana modal, pues el usuario no podra cerrarla 
            si hace clic en alguna parte de la pantalla */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={open}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            {/* Mensaje de victoria  */}
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                {
                                    // Dependiendo del nivel, si no es el nivel 20 (porque es el ultimo nivel), 
                                    // mostrara un mensaje de acuerdo a la condición
                                    level !== 20 ? "Felicidades, usted gano 🏅" : "Felicidades, usted ha ganado el juego 👑"
                                }
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    {
                                        level !== 20 ? "Usted ha derrotado a los bots, puede proceder al siguiente nivel"
                                            : "Usted ha derrotado a todos los bots del juego"
                                    }
                                </p>
                            </div>
                            <div className="mt-10 flex flex-row gap-4">
                                {
                                    // Si el nivel no es el nivel 20, mostrara un botón para ir al siguiente nivel
                                    level !== 20 && (
                                        // Se establece en la propiedad to la ruta hacia el siguiente nivel y al
                                        // hacer clic en el enlace, se cerrara la ventana modal
                                        <Link
                                            className="w-full py-2 px-4 font-semibold bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none transition-all duration-300 text-center"
                                            to={`/level_${level + 1}`} onClick={close}
                                        >
                                            Siguiente nivel
                                        </Link>
                                    )
                                }

                                {/* Botón para salir del juego */}
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
