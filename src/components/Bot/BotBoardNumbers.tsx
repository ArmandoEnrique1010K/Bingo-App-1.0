import { Board } from "../../types"
import BotRowNumbers from "./BotRowNumbers"

type BotBoardNumbersProps = {
    board: Board,
    handleSelectedPosition: (position: { x: number, y: number }) => boolean,
    // handleCheckNumber: (number: number, position: number) => void
    // showBotNumbers: boolean
}


export default function BotBoardNumbers({ board, handleSelectedPosition /*, showBotNumbers*/ }: BotBoardNumbersProps) {
    return (
        <div className="grid grid-cols-5">
            {/* {
                    board.map((b, index) => (
                        <BotRowNumbers key={index} board={b} handleClickButton={handleClickButton} handleCheckNumber={handleCheckNumber} min={5 * index + 1} max={5 * index + 5} />
                    ))
                } */}
            <BotRowNumbers board={board} handleSelectedPosition={handleSelectedPosition} max={0} />
            <BotRowNumbers board={board} handleSelectedPosition={handleSelectedPosition} max={1} />
            <BotRowNumbers board={board} handleSelectedPosition={handleSelectedPosition} max={2} />
            <BotRowNumbers board={board} handleSelectedPosition={handleSelectedPosition} max={3} />
            <BotRowNumbers board={board} handleSelectedPosition={handleSelectedPosition} max={4} />
        </div>
    )
}


/*
5 * 0 + 1
5 * 0 + 5

5 * 1 + 1
5 * 1 + 5

5 * 2 +

*/