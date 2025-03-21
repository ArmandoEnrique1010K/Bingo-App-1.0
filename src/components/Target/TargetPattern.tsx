import PatternBoard from "./PatternBoard"

type TargetPatternProps = {
    level: number,
    text: string,
    color: string
    patterns: number[][]
}

// Componente para mostrar el patrón objetivo
export default function TargetPattern({ color, text, patterns }: TargetPatternProps) {

    // console.log(color);
    return (
        <div className="w-full bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col sm:min-w-20 sm:ml-0 sm:mr-0 mr-2 sm:w-auto ">
            <div className={`sm:text-xl font-semibold text-center mb-4 text-${color}-500`}>
                Patrón objetivo
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center w-auto">
                {/* Imagen del patrón, se especifica la clase min-w-20, ancho minimo */}

                {/* <div className="flex justify-center">
                    <img
                        src={`/images/patterns/level_${level}.svg`}
                        alt={`Patrón del nivel ${level}`}
                        className="w-28 sm:w-56 md:w-36 shadow-lg"
                    />
                </div> */}
                <PatternBoard color={color} patterns={patterns} />

                <div className="sm:text-lg  text-sm text-white text-center my-auto ">
                    {text}
                </div>
            </div>
        </div>
    )
}
