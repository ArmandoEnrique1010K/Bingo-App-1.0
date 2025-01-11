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
                className={`text-sm w-6 h-6 text-center border-2 border-gray-600 text-white ${handleSelectedNumber(number.number, number.position) === true ? "bg-cyan-500" : "bg-gray-500"
                    }`}
            >
                {number.position === 13 ? 'F' : ""}
            </div>


        </>
    )
}
