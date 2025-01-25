type TargetPatternProps = {
    level: number,
    text: string
}

// Componente para mostrar el patrón objetivo
export default function TargetPattern({ level, text }: TargetPatternProps) {

    return (
        <div className="w-full bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col sm:min-w-20 sm:ml-0 sm:mr-0 mr-2  sm:w-auto ">
            <div className="sm:text-xl font-semibold text-center text-cyan-400 mb-4 ">
                Patrón objetivo
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <div className="flex justify-center">
                    {/* Imagen del patrón, se especifica la clase min-w-20, ancho minimo */}
                    <img
                        src={`/images/patterns/level_${level}.svg`}
                        alt={`Patrón del nivel ${level}`}
                        className="w-24 sm:w-36 min-w-20 shadow-lg"
                    />
                </div>

                <div className="sm:text-lg  text-gray-300 text-center my-auto ">
                    {text}
                </div>
            </div>
        </div>
    )
}
