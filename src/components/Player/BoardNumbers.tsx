import { Board } from "../../types"
import ColumnNumbers from "./ColumnNumbers"

type BoardNumbersProps = {
    board: Board
    idBoard: number,
}

export default function BoardNumbers({ board, idBoard }: BoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row gap-2 sm:p-4 p-2 bg-gray-700 justify-center items-center">

                {/* Conviene usar un arreglo para generar dinamicamente las columnas del tablero */}
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <ColumnNumbers
                            key={index}
                            numberBoard={board}
                            idBoard={idBoard}
                            min={((index) * 5) + 1}
                            max={(index + 1) * 5}
                        />
                    ))
                }
            </div>
        </>
    )
}
