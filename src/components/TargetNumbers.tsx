import { useEffect, useState } from "react"

type TargetNumbersProps = {
    handleChangeTargets: () => void,
    targets: number[]
    round: number
}

export default function TargetNumbers({ handleChangeTargets, targets, round }: TargetNumbersProps) {

    // Mostrar el boton
    const [showButton, setShowButton] = useState(true);


    // const target = useMemo(() => {
    //     if (targets) {
    //         console.log("Se oculta el boton")
    //         setShowButton(false)
    //     }

    //     if (targets && targets.length !== 0) {
    //         {
    //             // Luego de 1,5 segundos muestra el botón
    //             setTimeout(() => {
    //                 setShowButton(true)
    //                 console.log("Muestra el botón")
    //             }, 1500)
    //         }
    //     }

    //     return targets;
    // }, [targets]);

    useEffect(() => {
        // if (targets || targets.length > 0) {

        if (targets) {
            console.log("Se oculta el boton")
            setShowButton(false)
        }

        if (targets && targets.length !== 0) {
            {
                // Luego de 1,5 segundos muestra el botón
                setTimeout(() => {
                    setShowButton(true)
                    console.log("Muestra el botón")
                }, 1500)
            }
        }
    }, [targets])


    return (
        <>
            <div>
                <h2>Objetivo</h2>
                <div className="p-3">{targets.map((n, index) => (
                    <span key={index} className="p-2 border-solid border-red-950 border-2 bg-red-300">{n} </span>
                ))}</div>
            </div>


            {
                showButton === true || round === 0 ? (
                    <button
                        className="bg-cyan-400 p-2"
                        onClick={() => handleChangeTargets()}>{
                            // No olvides cambiar el texto del botón dependiendo de si hay objetivos o no
                            targets.length === 0 ? "Iniciar partida" : "Siguiente ronda"

                            // round === 0 ? "Iniciar partida" : targets.length !== 0 && showButton === true && "Siguiente ronda"
                        }</button>

                ) : ""
            }

        </>
    )
}