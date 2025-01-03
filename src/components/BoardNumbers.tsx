import { Board } from "../types"
import RowNumbers from "./RowNumbers"

type BoardNumbersProps = {
    board: Board,
    type: string,
    handleClickButton: (number: number, position: number) => void,
    handleSelectedNumber: (number: number, position: number) => string
}


export default function BoardNumbers({ board, type, handleClickButton, handleSelectedNumber }: BoardNumbersProps) {
    return (
        <>
            <div className={`flex flex-row ${type === 'player' ? '' : 'p-2'}`} >
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={1} max={5} type={type} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={6} max={10} type={type} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={11} max={15} type={type} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={16} max={20} type={type} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} min={21} max={25} type={type} />
            </div>

        </>
    )
}
