import { Board } from "../../types"
import RowNumbers from "../Player/RowNumbers"

type BoardNumbersProps = {
    board: Board,
    handleClickButton: (idBoard: number, number: number, position: { x: number, y: number }) => void,
    handleSelectedNumber: (idBoard: number, position: { x: number, y: number }) => boolean
    idBoard: number
}


export default function BoardNumbers({ board, handleClickButton, handleSelectedNumber, idBoard }: BoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row gap-2 px-8 py-4 bg-gray-700 shadow-lg  justify-center items-center">
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    max={0} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    max={1} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    max={2} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    max={3} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber} idBoard={idBoard}
                    max={4} />
            </div>
            {/* <div className="bg-gray-700 rounded-xl flex flex-row gap-3 px-3 py-2 justify-center">
                <VictoryModal level={level} handleCheckWinnerPattern={handleCheckWinnerPattern} />
                <LeaveModal />
            </div> */}

        </>
    )
}
