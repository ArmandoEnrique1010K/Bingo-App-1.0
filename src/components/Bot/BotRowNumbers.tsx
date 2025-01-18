import { Board } from "../../types"
import BotSquareNumber from "./BotSquareNumber"

type BotRowNumbersProps = {
    board: Board,
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    max: number
    min: number
    idBoard: number
}

export default function BotRowNumbers({ board, handleSelectedPosition, max, min, idBoard }: BotRowNumbersProps) {
    return (
        <>
            <div className="flex flex-col">
                {
                    // board.filter(n => n.position.y >= 0 && n.position.y <= 4 && n.position.x === max).map((number) => (
                    //     <BotSquareNumber key={number.position.y} idBoard={idBoard} handleSelectedPosition={handleSelectedPosition} number={{ number: number.number, position: { x: number.position.x, y: number.position.y } }}
                    //     />
                    // ))
                    board.filter(n => n.position >= min && n.position <= max).map((number) => (
                        <BotSquareNumber key={number.position} idBoard={idBoard} handleSelectedPosition={handleSelectedPosition} number={{ number: number.number, position: number.position }}
                        />
                    ))

                }
            </div>
        </>
    )
}
