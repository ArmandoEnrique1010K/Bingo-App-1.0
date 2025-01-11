import { Board } from "../../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleSelectedNumber: (position: { x: number, y: number }) => boolean,
    handleClickButton: (number: number, position: { x: number, y: number }) => void,
    max: number,
}


export default function RowNumbers({ numberBoard, handleSelectedNumber, handleClickButton, max }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    numberBoard.filter(n => n.y >= 0 && n.y <= 4 && n.x === max).map((n) => (
                        <ButtonNumber
                            key={n.y}
                            handleSelectedNumber={handleSelectedNumber}
                            handleClickButton={handleClickButton}
                            n={{ number: n.number, position: { x: n.x, y: n.y } }}
                        />
                    ))
                }

            </div>
        </>
    )
}