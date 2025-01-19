type BotSquareNumberProps = {
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    number: {
        number: number,
        position: number
    },
    idBoard: number
}

export default function BotSquareNumber({ handleSelectedPosition, number, idBoard }: BotSquareNumberProps) {
    return (
        <>
            <div
                className={`text-sm w-6 h-6 text-center border-2 border-gray-600 text-white 
                    ${handleSelectedPosition(idBoard, number.position) === true
                        ? "bg-cyan-500"
                        : "bg-gray-500"}`
                }
            >
                {/* El bot no muestra los numeros de su tablero */}
                {number.position === 13 ? 'F' : /*number.number*/ ''}
            </div>
        </>
    )
}
