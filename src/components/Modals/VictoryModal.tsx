import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router';

type VictoryModal = {
    level: number
    handleCheckWinnerPattern: () => boolean
}

export default function VictoryModal({ level, handleCheckWinnerPattern }: VictoryModal) {

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
            <button onClick={check} className='bg-red-600' aria-hidden="true">Comprobar el patrón ganador</button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={open}>
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
                            <div className="mt-10 flex flex-row gap-12">
                                {
                                    // <Button
                                    //     onClick={nextLevel}
                                    //     className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                    // >
                                    //     Siguiente nivel
                                    // </Button>
                                    <Link to={`/level_${level + 1}`} onClick={close}>Siguiente nivel</Link>
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
