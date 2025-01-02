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
                        <p>A Home for FLOWER - OMORIBOY MOD</p>
                    </>
                )
            }
        </>

    )
}