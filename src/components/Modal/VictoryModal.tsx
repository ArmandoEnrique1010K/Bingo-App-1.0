import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router';

type VictoryModalProps = {
    level: number
    handleCheckWinnerPattern: () => boolean
}

export default function VictoryModal({ level, handleCheckWinnerPattern }: VictoryModalProps) {

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


    function check() {
        if (handleCheckWinnerPattern() === true) {
            setIsOpen(true)
        }
    }

    return (
        <>
            {/* Eliminar este atributo es la solución? aria-hidden="true" */}
            <button onClick={check}
                className='bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow-black shadow-md hover:bg-cyan-600 active:bg-cyan-700 transition duration-300'>Comprobar patrón</button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={open}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                Felicidades, usted gano
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    {
                                        level !== 20 ? "Usted ha derrotado a los bots, puede proceder al siguiente nivel"
                                            : "Usted gano el juego"
                                    }
                                </p>
                            </div>
                            <div className="mt-10 flex flex-row gap-4">
                                {
                                    // <Button
                                    //     onClick={nextLevel}
                                    //     className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                    // >
                                    //     Siguiente nivel
                                    // </Button>

                                    level !== 20 ? (

                                        <Link className="w-full py-2 px-4 font-semibold bg-cyan-500 text-white rounded-lg text-lg hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none transition-all duration-300 text-center"
                                            to={`/level_${level + 1}`} onClick={close}>Siguiente nivel</Link>

                                    ) : ("")
                                }
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
