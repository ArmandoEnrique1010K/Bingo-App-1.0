type BotSquareNumberProps = {
    handleSelectedNumber: (number: number, position: number) => boolean,
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
                className={`text-lg font-bold p-2 border-2 border-gray-600 text-white ${handleSelectedNumber(number.number, number.position) === true ? "bg-cyan-500" : "bg-gray-500"
                    }`}
            >
                {/* {number.number} */}
            </div>


        </>
    )
}
