import { useEffect, useState } from "react"

type TargetNumbersProps = {
    handleChangeTargets: () => void,
    targets: number[]
    round: number
}

export default function TargetNumbers({ handleChangeTargets, targets, round }: TargetNumbersProps) {

    /// TODO: Podria mejorar el renderizado del botón?

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
        <div className="bg-gray-700 rounded-xl p-3 shadow-lg
        h-48
        mb-4">
            {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg"> */}
            <h2 className=" text-cyan-400 text-xl font-bold mb-2">Objetivos</h2>

            <div className="flex flex-wrap justify-center gap-4 p-3">
                {targets.map((n, index) => (
                    <div
                        key={index}
                        // Se define un ancho y altura para que tenga una forma circular con rounded-full
                        className="
                        w-12 h-12 flex items-center justify-center border-2 
                            border-none bg-white 
                            text-black font-semibold
                            rounded-full text-lg
                            "
                    >
                        {n}
                    </div>
                ))}

            </div>
            {
                showButton === true || round === 0 ? (
                    <div className="text-center mt-2">
                        <button
                            className="bg-cyan-400 text-white font-semibold px-6 py-3 
                            rounded-lg shadow-black shadow-md 
                            hover:bg-cyan-500 active:bg-cyan-600
                            transition duration-300
                            mb-4"
                            onClick={() => handleChangeTargets()}>{
                                // No olvides cambiar el texto del botón dependiendo de si hay objetivos o no
                                targets.length === 0 ? "Iniciar partida" : "Siguiente"

                                // round === 0 ? "Iniciar partida" : targets.length !== 0 && showButton === true && "Siguiente ronda"
                            }</button>

                    </div>

                ) : ""
            }



            {/* </div> */}


        </div>
    )
}