import { Board } from "../../types"
import BotColumnNumbers from "./BotColumnNumbers"

type BotBoardNumbersProps = {
    board: Board,
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    idBoard: number
}


export default function BotBoardNumbers({ board, handleSelectedPosition, idBoard }: BotBoardNumbersProps) {
    return (
        <div className="grid grid-cols-5">
            <BotColumnNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={1} max={5} />
            <BotColumnNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={6} max={10} />
            <BotColumnNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={11} max={15} />
            <BotColumnNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={16} max={20} />
            <BotColumnNumbers idBoard={idBoard} board={board} handleSelectedPosition={handleSelectedPosition} min={21} max={25} />
        </div>
    )
}