import { useState } from "react";
// Importa un icono de hero icons, se utiliza el siguiente formato, existe una variedad de iconos
import { InformationCircleIcon } from '@heroicons/react/24/solid'

// Este componente es una página que muestra la información del autor que desarrollo esta aplicación
export default function Credits() {

    const [showCredits, setShowCredits] = useState(false);

    // TODO: Convertir este componente en una ventana modal que se pueda abrir desde el menú principal
    return (
        <>
            {/* Aplicale estilos al icono para que se muestre */}
            <button onClick={() => setShowCredits(!showCredits)}><InformationCircleIcon className='h-12 w-12 text-blue-300' aria-hidden="true" /></button>
            {
                showCredits === true && (
                    <>
                        <h2>Development</h2>
                        <p>Enrique1010k</p>

                        <h2>Icons</h2>
                        <p>HeroIcons</p>

                        <h2>Tecnologies</h2>
                        <p>HTML, TailwindCSS, TypeScript, ReactJS & ToneJS</p>

                        <h2>Music</h2>
                        <p>Tap Out - Strokes(2013) instrumental</p>


                    </>
                )
            }
        </>

    )
}

// ICONOS DE HEROICONS
// https://www.npmjs.com/package/@heroicons/react

