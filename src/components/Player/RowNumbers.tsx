import { Board } from "../../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleSelectedNumber: (idBoard: number, position: { x: number, y: number }) => boolean,
    handleClickButton: (idBoard: number, number: number, position: { x: number, y: number }) => void,
    max: number,
    idBoard: number
}


export default function RowNumbers({ numberBoard, handleSelectedNumber, handleClickButton, max, idBoard }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    numberBoard.filter(n => n.position.y >= 0 && n.position.y <= 4 && n.position.x === max).map((n) => (
                        <ButtonNumber
                            key={n.position.y}
                            handleSelectedNumber={handleSelectedNumber}
                            handleClickButton={handleClickButton}
                            n={{ number: n.number, position: { x: n.position.x, y: n.position.y } }}
                            idBoard={idBoard}
                        />
                    ))
                }

            </div>
        </>
    )
}