import { Board } from "../../types"
import BotSquareNumber from "./BotSquareNumber"

type BotRowNumbersProps = {
    board: Board,
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    max: number
    min: number
    idBoard: number
}

export default function BotColumnNumbers({ board, handleSelectedPosition, max, min, idBoard }: BotRowNumbersProps) {
    return (
        <>
            <div className="flex flex-col">
                {
                    // Itera sobre board seleccionando unos 5 numeros con filter para asignarlos a BotSquareNumber
                    board.filter(n => n.position >= min && n.position <= max).map((n) => (
                        <BotSquareNumber key={n.position} idBoard={idBoard} handleSelectedPosition={handleSelectedPosition}
                            value={{ number: n.number, position: n.position }}
                        />
                    ))
                }
            </div>
        </>
    )
}
