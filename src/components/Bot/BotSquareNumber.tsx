type BotSquareNumberProps = {
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    // handleCheckNumber: (number: number, position: number) => string
    number: {
        number: number,
        position: number
    },
    idBoard: number
    // showBotNumbers: boolean
}

export default function BotSquareNumber({ handleSelectedPosition, number, idBoard
    /* showBotNumbers*/
}: BotSquareNumberProps) {
    return (
        <>
            <div
                className={`text-sm w-6 h-6 text-center border-2 border-gray-600 text-white ${handleSelectedPosition(idBoard, number.position) === true ? "bg-cyan-500" : "bg-gray-500"
                    }`}
            >
                {number.position === 13 ? 'F' : /*number.number*/ ''}
            </div>


        </>
    )
}
