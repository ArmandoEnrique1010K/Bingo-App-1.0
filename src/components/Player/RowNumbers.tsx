import { Board } from "../../types"
import ButtonNumber from "./ButtonNumber"

type RowNumbersProps = {
    numberBoard: Board,
    handleSelectedNumber: (idBoard: number, position: number) => boolean,
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    min: number
    max: number,
    idBoard: number
}


export default function RowNumbers({ numberBoard, handleSelectedNumber, handleClickButton, max, min, idBoard }: RowNumbersProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                {
                    // numberBoard.filter(n => n.position.y >= 0 && n.position.y <= 4 && n.position.x === max).map((n) => (
                    numberBoard.filter(n => n.position >= min && n.position <= max).map((n) => (
                        <ButtonNumber
                            key={n.position}
                            handleSelectedNumber={handleSelectedNumber}
                            handleClickButton={handleClickButton}
                            n={{ number: n.number, position: n.position }}
                            idBoard={idBoard}
                        />
                    ))
                }

            </div>
        </>
    )
}