import { Board } from "../../types"
import BotRowNumbers from "./BotRowNumbers"

type BotBoardNumbersProps = {
    board: Board,
    handleSelectedNumber: (number: number, position: number) => void,
    // handleCheckNumber: (number: number, position: number) => void
    // showBotNumbers: boolean
}


export default function BotBoardNumbers({ board, handleSelectedNumber /*, showBotNumbers*/ }: BotBoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row p-2">
                {/* {
                    board.map((b, index) => (
                        <BotRowNumbers key={index} board={b} handleClickButton={handleClickButton} handleCheckNumber={handleCheckNumber} min={5 * index + 1} max={5 * index + 5} />
                    ))
                } */}
                <BotRowNumbers board={board} handleSelectedNumber={handleSelectedNumber} min={1} max={5}  /* showBotNumbers={showBotNumbers}*/ />
                <BotRowNumbers board={board} handleSelectedNumber={handleSelectedNumber} min={6} max={10} /* showBotNumbers={showBotNumbers}*/ />
                <BotRowNumbers board={board} handleSelectedNumber={handleSelectedNumber} min={11} max={15}/* showBotNumbers={showBotNumbers}*/ />
                <BotRowNumbers board={board} handleSelectedNumber={handleSelectedNumber} min={16} max={20}/* showBotNumbers={showBotNumbers}*/ />
                <BotRowNumbers board={board} handleSelectedNumber={handleSelectedNumber} min={21} max={25}/* showBotNumbers={showBotNumbers}*/ />


            </div>
        </>
    )
}


/*
5 * 0 + 1
5 * 0 + 5

5 * 1 + 1
5 * 1 + 5

5 * 2 +

*/