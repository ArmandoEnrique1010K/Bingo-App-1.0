type TargetPatternProps = {
    level: number,
    text: string
}

export default function TargetPattern({ level, text }: TargetPatternProps) {

    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-xl font-semibold text-center text-cyan-400 mb-4">
                Forma el siguiente patrón para ganar el nivel
            </div>

            {/* Texto del patrón */}
            <div className="text-lg text-gray-300 text-center mb-6">
                {text}
            </div>

            {/* Imagen del patrón */}
            <div className="flex justify-center">
                <img
                    src={`/images/patterns/level_${level}.svg`}
                    alt={`Patrón del nivel ${level}`}
                    className="max-w-full h-auto rounded-md border-4 border-cyan-500 shadow-lg"
                />
            </div>
        </div>
    )
}
