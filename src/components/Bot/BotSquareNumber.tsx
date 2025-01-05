type BotSquareNumberProps = {
    handleSelectedNumber: (number: number, position: number) => void,
    // handleCheckNumber: (number: number, position: number) => string
    number: {
        position: number,
        number: number
    }
    // showBotNumbers: boolean
}

export default function BotSquareNumber({ handleSelectedNumber, number,
    /* showBotNumbers*/
}: BotSquareNumberProps) {
    return (
        <>
            <div
                className={`text-lg font-bold p-3 border-2 border-gray-600 rounded-lg bg-gray-700 text-white ${handleSelectedNumber(number.number, number.position)
                    }`}
            >
                {/* {number.number} */}
            </div>


        </>
    )
}
