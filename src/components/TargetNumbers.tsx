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
        <div className=" justify-center gap-8 mb-6 max-w-md mx-auto w-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Objetivos</h2>

                <div className="flex flex-wrap justify-center gap-4 p-3">
                    {targets.map((n, index) => (
                        <div
                            key={index}
                            // Forma circular
                            // px-4 py-2 
                            className="w-10 h-10 flex items-center justify-center border-2 
                            border-cyan-800 bg-cyan-400 text-red-950 font-semibold 
                            rounded-full shadow-md mb-4"
                        >
                            {n}
                        </div>
                    ))}
                </div>
                {
                    showButton === true || round === 0 ? (
                        <div className="text-center">
                            <button
                                className="bg-cyan-400 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300"
                                onClick={() => handleChangeTargets()}>{
                                    // No olvides cambiar el texto del botón dependiendo de si hay objetivos o no
                                    targets.length === 0 ? "Iniciar partida" : "Siguiente ronda"

                                    // round === 0 ? "Iniciar partida" : targets.length !== 0 && showButton === true && "Siguiente ronda"
                                }</button>

                        </div>

                    ) : ""
                }



            </div>


        </div>
    )
}