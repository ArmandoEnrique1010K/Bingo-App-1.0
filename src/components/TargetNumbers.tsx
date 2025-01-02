type TargetNumbersProps = {
    handleChangeTargets: () => void,
    targets: number[]
}

export default function TargetNumbers({ handleChangeTargets, targets }: TargetNumbersProps) {
    return (
        <>
            <div>
                <h2>Objetivo</h2>
                <div className="p-3">{targets.map((n, index) => (
                    <span key={index} className="p-2 border-solid border-red-950 border-2 bg-red-300">{n} </span>
                ))}</div>
            </div>



            <button
                className="bg-cyan-400 p-2"
                onClick={() => handleChangeTargets()}>{
                    // No olvides cambiar el texto del botón dependiendo de si hay objetivos o no
                    targets.length === 0 ? "Iniciar partida" : "Siguiente ronda"
                }</button>

        </>
    )
}