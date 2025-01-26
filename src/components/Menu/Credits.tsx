import { useState } from "react";
// Importa un icono de hero icons, utiliza el siguiente formato para importar un icono
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// Este componente es una ventana modal que muestra la información del autor que desarrollo esta aplicación
export default function Credits() {

    const [isOpen, setIsOpen] = useState(false);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    // READY Convertir este componente en una ventana modal que se pueda abrir desde el menú principal
    return (
        <>
            {/* El botón contiene un icono de HeroIcons */}
            <button onClick={open} className="sm:py-4 py-2 px-3  text-cyan-500 hover:text-cyan-600 active:text-cyan-700"><InformationCircleIcon className='sm:w-8 w-6' aria-hidden="true" /></button>

            {/* Recuerda que puedes hacer clic en cualquier parte de la pantalla para cerrar la ventana modal */}
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
                {/* Aplica el color de fondo con opacidad */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <DialogPanel
                            transition
                            className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out 
                            
                            data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h2" className="text-4xl font-semibold text-center text-gray-900 mb-10">
                                Créditos del autor
                            </DialogTitle>
                            <div className="space-y-3 text-lg text-gray-700">
                                <p>
                                    <span className="font-bold">Desarrollado por: ArmandoEnrique1010K</span>
                                </p>
                                <p>
                                    Esta aplicación fue creada para probar todos los conocimientos adquiridos en Udemy.
                                </p>
                                <p>
                                    Agradecimientos especiales a <span className="font-bold">Juan Pablo de la Torre</span>
                                </p>
                                <p>
                                    <span className="font-bold">Tecnologias web utilizadas:</span> HTML, TailwindCSS, TypeScript & ReactJS
                                </p>
                                <p>
                                    <span className="font-bold">Librerias utilizadas:</span> ToneJS, HeadlessUI & HeroIcons.
                                </p>
                                <p>
                                    <span className="font-bold">Música:</span> Tap Out (instrumental) - The Strokes (2013)
                                </p>
                                <p>
                                    <span className="font-bold">Favicon: </span>Icono de <a target="_blank" href="https://icons8.com/icon/58439/bingo">Bingo</a> proporcionado por <a target="_blank" href="https://icons8.com">Icons8</a> y svgRepo
                                </p>
                            </div>
                            <div className="mt-10">
                                {/* Botón para cerrar la ventana modal */}
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

// ICONOS DE HEROICONS
// https://www.npmjs.com/package/@heroicons/react

// HEADLESS UI
// https://headlessui.com/react/dialog