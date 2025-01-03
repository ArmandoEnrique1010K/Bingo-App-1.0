import { useState } from "react";

// Este componente es una página que muestra la información del autor que desarrollo esta aplicación
export default function Credits() {
    const [showCredits, setShowCredits] = useState(false);

    // TODO: Convertir este componente en una ventana modal que se pueda abrir desde el menú principal
    return (
        <>
            <button onClick={() => setShowCredits(!showCredits)}>Ver creditos</button>
            {
                showCredits === true && (
                    <>
                        <h2>Music</h2>
                        <p>Tap Out - Strokes(2013)</p>
                        <p>Ready to Start - Arcade Fire(2010)</p>
                    </>
                )
            }
        </>

    )
}