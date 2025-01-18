import { Board } from "../../types"
import BotRowNumbers from "./BotRowNumbers"

type BotBoardNumbersProps = {
    board: Board,
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    // handleCheckNumber: (number: number, position: number) => void
    // showBotNumbers: boolean
    idBoard: number
}


export default function BotBoardNumbers({ board, handleSelectedPosition /*, showBotNumbers*/, idBoard }: BotBoardNumbersProps) {
    return (
        <div className="grid grid-cols-5">
            {/* {
                    board.map((b, index) => (
                        <BotRowNumbers key={index} board={b} handleClickButton={handleClickButton} handleCheckNumber={handleCheckNumber} min={5 * index + 1} max={5 * index + 5} />
                    ))
                } */}
            <BotRowNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={1} max={5} />
            <BotRowNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={6} max={10} />
            <BotRowNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={11} max={15} />
            <BotRowNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={16} max={20} />
            <BotRowNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={21} max={25} />
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