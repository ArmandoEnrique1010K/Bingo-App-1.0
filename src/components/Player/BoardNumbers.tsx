import { Board } from "../../types"
import RowNumbers from "../Player/RowNumbers"

type BoardNumbersProps = {
    board: Board
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    handleSelectedNumber: (idBoard: number, position: number) => boolean
    idBoard: number
}


export default function BoardNumbers({ board, handleClickButton, handleSelectedNumber, idBoard }: BoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row gap-2 p-4 bg-gray-700 justify-center items-center">
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    min={1} max={5} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    min={6} max={10} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    min={11} max={15} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    min={16} max={20} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    min={21} max={25} />
            </div>
            {/* <div className="bg-gray-700 rounded-xl flex flex-row gap-3 px-3 py-2 justify-center">
                <VictoryModal level={level} handleCheckWinnerPattern={handleCheckWinnerPattern} />
                <LeaveModal />
            </div> */}

        </>
    )
}
