import LeaveModal from "./LeaveModal"
import VictoryModal from "./Modals/VictoryModal"

type TargetPatternProps = {
    level: number,
    text: string
    handleCheckWinnerPattern: () => boolean
}

export default function TargetPattern({ level, text, handleCheckWinnerPattern }: TargetPatternProps) {

    return (
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="text-xl font-semibold text-center text-cyan-400 mb-4">
                Forma el siguiente patrón
            </div>

            <div className="flex flex-row">
                {/* Imagen del patrón */}
                <div className="flex justify-center">
                    <img
                        src={`/images/patterns/level_${level}.svg`}
                        alt={`Patrón del nivel ${level}`}
                        className="w-48 rounded-md border-4 border-cyan-500 shadow-lg"
                    />
                </div>
                <div className="text-lg text-gray-300 text-center my-auto">

                    {text}
                </div>


            </div>
        </div>
    )
}
