import { Board } from "../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleSelectedNumber: (number: number, position: number) => string,
    handleClickButton: (number: number, position: number) => void,
    min: number,
    max: number,
    type: string,
}


export default function RowNumbers({ numberBoard, handleSelectedNumber, handleClickButton, min, max, type }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col">
                {
                    numberBoard.filter(n => n.position >= min && n.position <= max).map((n) => (
                        <ButtonNumber key={n.position} handleSelectedNumber={handleSelectedNumber} handleClickButton={handleClickButton} n={n} type={type} />
                    ))
                }

            </div>
        </>
    )
}