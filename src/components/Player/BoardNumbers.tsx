import { Board } from "../../types"
import ColumnNumbers from "./ColumnNumbers"

type BoardNumbersProps = {
    board: Board
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    handleIsSelectedNumber: (idBoard: number, position: number) => boolean
    idBoard: number
}

export default function BoardNumbers({ board, handleClickButton, handleIsSelectedNumber, idBoard }: BoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row gap-2 sm:p-4 p-2 bg-gray-700 justify-center items-center">

                {/* Conviene usar un arreglo para generar dinamicamente las columnas del tablero */}
                {
                    Array.from({ length: 5 }).map((_, index) => (
                        <ColumnNumbers key={index} numberBoard={board} handleClickButton={handleClickButton}
                            handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                            min={((index) * 5) + 1} max={(index + 1) * 5} />
                    ))
                }

                {/* 
                    <ColumnNumbers numberBoard={board} handleClickButton={handleClickButton} handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                        min={1} max={5} />
                    <ColumnNumbers numberBoard={board} handleClickButton={handleClickButton} handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                        min={6} max={10} />
                    <ColumnNumbers numberBoard={board} handleClickButton={handleClickButton} handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                        min={11} max={15} />
                    <ColumnNumbers numberBoard={board} handleClickButton={handleClickButton} handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                        min={16} max={20} />
                    <ColumnNumbers numberBoard={board} handleClickButton={handleClickButton} handleIsSelectedNumber={handleIsSelectedNumber} idBoard={idBoard}
                        min={21} max={25} /> 
                */}
            </div>
        </>
    )
}
