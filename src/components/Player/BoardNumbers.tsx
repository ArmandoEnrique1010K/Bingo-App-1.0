import { Board } from "../../types"
import RowNumbers from "../Player/RowNumbers"

type BoardNumbersProps = {
    board: Board,
    handleClickButton: (number: number, position: { x: number, y: number }) => void,
    handleSelectedNumber: (position: { x: number, y: number }) => boolean
}


export default function BoardNumbers({ board, handleClickButton, handleSelectedNumber }: BoardNumbersProps) {
    return (
        <>
            <div className="flex flex-row gap-2 p-4 bg-gray-700 shadow-lg rounded-t-xl justify-center items-center">
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber}
                    max={0} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber}
                    max={1} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber}
                    max={2} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber}
                    max={3} />
                <RowNumbers numberBoard={board} handleClickButton={handleClickButton} handleSelectedNumber={handleSelectedNumber}
                    max={4} />
            </div>
            {/* <div className="bg-gray-700 rounded-xl flex flex-row gap-3 px-3 py-2 justify-center">
                <VictoryModal level={level} handleCheckWinnerPattern={handleCheckWinnerPattern} />
                <LeaveModal />
            </div> */}

        </>
    )
}
