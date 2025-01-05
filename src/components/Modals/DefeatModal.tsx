import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from "react";
import { useNavigate } from 'react-router';

type DefeatModalProps = {
    level: number
    defeat: boolean
    //
    setDefeat: any
}

export default function DefeatModal({ level, defeat, setDefeat }: DefeatModalProps) {

    const [isOpen, setIsOpen] = useState(true);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const navigate = useNavigate()

    function exit() {
        navigate('/')
        setDefeat(false)
        // close()
    }

    // Siguiente nivel
    // function nextLevel() {
    //     navigate(`/level_${level + 1}`)
    //     setIsOpen(false)
    // }

    // Volver a intentarlo
    function tryAgain() {
        navigate(`/level_${level}`)
        setDefeat(false)
        close()
    }


    // Recordar que useEffect dispara el efecto cuando cambia type
    // useEffect(() => {
    //     if (type === "defeat") {
    //         setIsOpen(true)
    //     }
    // }, [type])

    return (
        <>
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
                                Mejor suerte para la proxima
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>

                                    ¿Desea volver a intentar este nivel?

                                </p>
                            </div>
                            <div className="mt-10 flex flex-row gap-12">
                                <Button
                                    onClick={tryAgain}
                                    className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none transition-all duration-300"
                                >
                                    Volver a intentarlo
                                </Button>
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
