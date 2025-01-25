import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react'
import { useNavigate } from 'react-router';

// Ventana modal para salir del juego
export default function LeaveModal() {

    // Estado para mostrar u ocultar la ventana modal
    const [isOpen, setIsOpen] = useState(false);

    // Asigna esta variable hacia una llamada del hook useNavigate
    const navigate = useNavigate()

    // Funciones para abrir y cerrar la ventana modal
    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    // Función para salir del juego, redirige hacia el endpoint '/'
    function leaveGame() {
        setIsOpen(false)
        navigate('/')
    }

    return (
        <>
            {/* Inicialmente al renderizar este componente, solamente se podra ver un botón */}
            {/* Al hacer clic en el botón, se mostrara la ventana modal */}

            {/* Por un tema de accesibilidad, se elimina el atributo aria-hidden="true" que viene por defecto */}
            <button onClick={open} className='bg-cyan-500 text-white font-semibold px-6 sm:py-3 py-2 rounded-lg shadow-black 
            shadow-md hover:bg-cyan-600 active:bg-cyan-700 transition duration-300 sm:text-base text-sm'>Abandonar partida</button>

            {/* El codigo para definir una ventana modal de HeadlessUI se obtiene de la documentación */}
            {/* https://headlessui.com/ */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                {/* Aplica el color de fondo con opacidad a la pantalla */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* El cuadro de dialogo, tiene una transición */}
                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            {/* Titulo de la ventana modal */}
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                ¿Deseas abandonar la partida?
                            </DialogTitle>

                            {/* Contenido */}
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    Tu progreso actual se perdera
                                </p>
                            </div>

                            {/* Botones para salir del juego y cerrar la ventana modal */}
                            <div className="mt-10 flex flex-row gap-4">
                                <Button
                                    // Solamente llama a la función respectivamente
                                    onClick={leaveGame}
                                    className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 active:bg-gray-700 focus:outline-none transition-all duration-300"
                                >
                                    Si
                                </Button>
                                <Button
                                    onClick={close}
                                    className="w-full py-2 px-4 bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none transition-all duration-300"
                                >
                                    No
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
