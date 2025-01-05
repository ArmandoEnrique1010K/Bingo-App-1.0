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
                className={`text-xl p-4 border-solid border-red-950 border-2 ${handleSelectedNumber(number.number, number.position)}`}
            // onClick={() => handleCheckNumber(number.number, number.position)}
            >
                {/* {
                    showBotNumbers === true ? number.number : ""
                } */}

                {number.number}
            </div>

        </>
    )
}
