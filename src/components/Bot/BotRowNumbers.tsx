import { Board } from "../../types"
import BotSquareNumber from "./BotSquareNumber"

type BotRowNumbersProps = {
    board: Board,
    handleSelectedNumber: (number: number, position: number) => void,
    // handleCheckNumber: (number: number, position: number) => string
    min: number
    max: number
    // showBotNumbers: boolean
}

export default function BotRowNumbers({ board, handleSelectedNumber, min, max /*, showBotNumbers*/ }: BotRowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-1">
                {
                    board.filter(n => n.position >= min && n.position <= max).map((number) => (
                        <BotSquareNumber key={number.position} handleSelectedNumber={handleSelectedNumber} number={number}
                        //showBotNumbers={showBotNumbers}
                        />
                    ))
                }
            </div>
        </>
    )
}
