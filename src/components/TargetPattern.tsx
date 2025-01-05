type TargetPatternProps = {
    level: number,
    text: string
    handleCheckWinnerPattern: () => boolean
}

export default function TargetPattern({ level, text }: TargetPatternProps) {

    return (
        <div className="bg-gray-700 p-3 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-xl font-semibold text-center text-cyan-400 mb-4 ">
                Forma el siguiente patrón
            </div>

            <div className="flex flex-row gap-2">
                {/* Imagen del patrón */}
                <div className="flex justify-center">
                    <img
                        src={`/images/patterns/level_${level}.svg`}
                        alt={`Patrón del nivel ${level}`}
                        className="w-44 h-44 rounded-md border-4 border-cyan-500 shadow-lg"
                    />
                </div>
                {/* El texto debe tener un elipsis */}
                <div className="text-lg text-gray-300 text-center my-auto w-32">
                    {text}
                </div>


            </div>
        </div>
    )
}
