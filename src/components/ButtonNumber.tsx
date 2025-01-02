type ButtonNumberProps = {
    handleClickButton: (number: number, position: number) => void,
    handleSelectedNumber: (number: number, position: number) => string,
    n: {
        number: number,
        position: number
    }
}

export default function ButtonNumber({ handleClickButton, handleSelectedNumber, n }: ButtonNumberProps) {
    return (
        <>
            <button
                // className="p-2 border-solid border-red-950 border-2 bg-red-300" 
                className={`text-xl p-4 border-solid border-red-950 border-2 ${handleSelectedNumber(n.number, n.position)}`}

                onClick={() => handleClickButton(n.number, n.position)}>
                {/* {n.position} --- */}
                {n.number}</button>

        </>
    )
}