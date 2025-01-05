import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function Help() {

    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    return (
        <>
            {/* Aplicale estilos al icono para que se muestre */}
            <button onClick={open}><QuestionMarkCircleIcon className='h-10 w-10 text-blue-300' aria-hidden="true" /></button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                {/* Aplica el color de fondo con opacidad */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                Instrucciones
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">


                                <p>
                                    Bienvenido a BingoApp. Esta aplicación ha sido diseñada para ofrecerte una experiencia única para jugar Bingo con Bots simulados.
                                </p>
                                <p>
                                    En el menú principal, encontrarás varios botones para interactuar con la aplicación
                                </p>
                                <p>
                                    <span className="font-bold">Niveles: </span>
                                    Aquí podrás acceder a los diferentes niveles del juego o la aplicación. Podrás desbloquear nuevos niveles a medida que avanzas. Los niveles desbloqueados se guardan en el almacenamiento local de tu navegador, lo que significa que tu progreso se conserva incluso después de cerrar la aplicación.
                                </p>

                                <p>
                                    <span className="font-bold">Música: </span>Puedes activar o desactivar la música de fondo.
                                </p>

                                <p>
                                    <span className="font-bold">Creditos: </span>Al hacer clic en el icono de "Información", accederás a los créditos del autor de la aplicación.
                                </p>
                                <p>
                                    Al iniciar una partida tu deberas hacer clic en el botón de "Iniciar partida", se generaran unos numeros que tu debes buscarlos en el tablero y marcarlos, al mismo tiempo los bots tambien iran marcando los números.
                                </p>
                                <p>
                                    Existen 3 tipos de bots:
                                    <p>Slow Bot</p>
                                    <p>Middle Bot</p>
                                    <p>Fast Bot</p>
                                    {/* <p>Trap Bot</p> */}
                                </p>

                                <p>El juego termina cuando tu o tu oponente forma el patrón requerido</p>




                            </div>
                            <div className="mt-10">
                                <Button
                                    onClick={close}
                                    className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

        </>


    )
}

