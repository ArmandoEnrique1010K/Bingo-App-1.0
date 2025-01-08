import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react'
import { useNavigate } from 'react-router';

export default function LeaveModal() {

    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    const navigate = useNavigate()

    function leaveLevel() {
        setIsOpen(false)
        navigate('/')
    }

    return (
        <>
            <button onClick={open} className='bg-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow-black shadow-md hover:bg-cyan-600 active:bg-cyan-700 transition duration-300' aria-hidden="true">Abandonar partida</button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                {/* Aplica el color de fondo con opacidad */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                ¿Deseas abandonar la partida?
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p className='text-center'>
                                    Tu progreso actual se perdera
                                </p>
                            </div>
                            <div className="mt-10 flex flex-row gap-4">
                                <Button
                                    onClick={leaveLevel}
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
