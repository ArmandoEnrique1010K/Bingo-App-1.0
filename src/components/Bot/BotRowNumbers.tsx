import { Board } from "../../types"
import BotSquareNumber from "./BotSquareNumber"

type BotRowNumbersProps = {
    board: Board,
    handleSelectedPosition: (position: { x: number, y: number }) => boolean,
    max: number
}

export default function BotRowNumbers({ board, handleSelectedPosition, max }: BotRowNumbersProps) {
    return (
        <>
            <div className="flex flex-col">
                {
                    board.filter(n => n.position.y >= 0 && n.position.y <= 4 && n.position.x === max).map((number) => (
                        <BotSquareNumber key={number.position.y} handleSelectedPosition={handleSelectedPosition} number={{ number: number.number, position: { x: number.position.x, y: number.position.y } }}
                        />
                    ))
                }
            </div>
        </>
    )
}
