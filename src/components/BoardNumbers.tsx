import { Board } from "../types"
import RowNumbers from "./RowNumbers"

type BoardNumbersProps = {
    board: Board,
    handleClickButton: (number: number, position: number) => void,
    handleSelectedNumber: (number: number, position: number) => string
}


export default function BoardNumbers({ board, handleClickButton, handleSelectedNumber }: BoardNumbersProps) {
    return (
        <>
            <h1>Tablero</h1>
            <div className="flex flex-row">

                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={1} max={5} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={6} max={10} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={11} max={15} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={16} max={20} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={21} max={25} />

            </div>

        </>
    )
}
