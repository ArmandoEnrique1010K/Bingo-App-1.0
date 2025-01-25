import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

// Ventana modal que muestra las instrucciones del juego
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
            <button onClick={open} className='sm:py-4 py-2 px-3 text-cyan-500 hover:text-cyan-600 active:text-cyan-700'><QuestionMarkCircleIcon className='sm:w-8 w-6 ' aria-hidden="true" /></button>

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
                                    Bienvenido a BingoApp. Tu objetivo es derrotar a los bots en un juego de Bingo, se el primero en formar el patrón ganador.
                                </p>
                                <p>
                                    En el menú principal, encontrarás varios botones para interactuar con la aplicación
                                </p>
                                <p>
                                    <span className="font-bold">Niveles: </span>
                                    Aquí podrás acceder a los diferentes niveles del juego o la aplicación. Podrás desbloquear nuevos niveles a medida que avanzas.
                                </p>

                                <p>
                                    <span className="font-bold">Música: </span>Puedes activar o desactivar la música de fondo.
                                </p>

                                <p>
                                    <span className="font-bold">Creditos: </span>Observa los créditos de la aplicación.
                                </p>
                                <h3 className='text-2xl pt-4 font-bold'>Iniciar partida</h3>
                                <p>
                                    Al iniciar una partida tu deberas hacer clic en el botón de "Iniciar partida", se generaran unos numeros aleatorios, los cuales tu debes buscarlos en el tablero y marcarlos, al mismo tiempo los bots tambien iran marcando los números.
                                </p>
                                <p>
                                    Existen 3 tipos de bots:
                                </p>
                                <ul>
                                    <li className='list-disc list-inside'>Slow bot</li>
                                    <li className='list-disc list-inside'>Middle Bot</li>
                                    <li className='list-disc list-inside'>Fast Bot</li>
                                </ul>

                                <p>Algunos niveles pueden tener 2 tableros tanto para el jugador como para el bot, el juego termina cuando el patrón ganador esta formado en uno de los tableros</p>

                                <p>El juego termina cuando tú formas el patrón objetivo en el tablero y pulsas el botón "Comprobar patrón" para ganar la partida o si tu oponente forma el patrón objetivo y tu piedes, lo cual tendras que volver a intentar la partida.</p>
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

