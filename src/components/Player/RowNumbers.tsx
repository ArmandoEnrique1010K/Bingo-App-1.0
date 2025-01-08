import { Board } from "../../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleSelectedNumber: (number: number, position: number) => boolean,
    handleClickButton: (number: number, position: number) => void,
    min: number,
    max: number,
}


export default function RowNumbers({ numberBoard, handleSelectedNumber, handleClickButton, min, max }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    numberBoard.filter(n => n.position >= min && n.position <= max).map((n) => (
                        <ButtonNumber key={n.position} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} n={n} />
                    ))
                }

            </div>
        </>
    )
}