import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router';

type GameOverModal = {
    type: string,
    level: number
}

export default function GameOverModal({ type, level }: GameOverModal) {

    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }


    const navigate = useNavigate()

    function exit() {
        navigate('/')
    }

    // Siguiente nivel
    // function nextLevel() {
    //     navigate(`/level_${level + 1}`)
    //     setIsOpen(false)
    // }

    // Volver a intentarlo
    function tryAgain() {
        navigate(`/level_${level}`)
        setIsOpen(false)
    }

    // Recordar que useEffect dispara el efecto cuando cambia type
    useEffect(() => {
        if (type === "victory") {
            setIsOpen(true)
        }
    }, [type])

    return (
        <>
            <button onClick={open} className='bg-red-600' aria-hidden="true">BINGO</button>

            {/* Esta ventana modal no se va a cerrar una vez que se abra */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={open}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                {type === "victory" ? 'Felicidades, usted gano' : "Mejor suerte para la proxima"}
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    {
                                        type === 'victory' ? "Usted ha derrotado a los bots, puede proceder al siguiente nivel"
                                            : level === 20 ? "Usted gano el juego"
                                                : "¿Desea volver a intentar este nivel?"
                                    }
                                </p>
                            </div>
                            <div className="mt-10 flex flex-row gap-12">
                                {
                                    type === "victory" ? (
                                        // <Button
                                        //     onClick={nextLevel}
                                        //     className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                        // >
                                        //     Siguiente nivel
                                        // </Button>
                                        <Link to={`/level_${level + 1}`} onClick={close}>Siguiente nivel</Link>
                                    ) : (
                                        <Button
                                            onClick={tryAgain}
                                            className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                        >
                                            Volver a intentarlo
                                        </Button>
                                    )
                                }
                                <Button
                                    onClick={exit}
                                    className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
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
