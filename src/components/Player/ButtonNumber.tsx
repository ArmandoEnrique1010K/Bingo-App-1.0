type ButtonNumberProps = {
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    handleSelectedNumber: (idBoard: number, position: number) => boolean,
    n: {
        number: number,
        position: number
    },
    idBoard: number
}

export default function ButtonNumber({ handleClickButton, handleSelectedNumber, n, idBoard }: ButtonNumberProps) {
    return (
        <>
            <button
                // className="p-2 border-solid border-red-950 border-2 bg-red-300" 
                // className={`text-xl p-4 border-solid border-red-950 border-2 ${handleSelectedNumber(n.number, n.position)}`}
                className={`text-2xl font-bold w-16 h-16 border-none rounded-lg text-white hover:bg-cyan-700 active:bg-cyan-600 transition duration-300 
                    ${handleSelectedNumber(idBoard, n.position) === true ? "bg-cyan-500" : "bg-gray-500"}`}

                onClick={() => handleClickButton(idBoard, n.number, n.position)}>
                {/* {n.position} --- */}
                {/* {n.position.y === 2 && n.position.x === 2 ? 'Free' : n.number} */}
                {n.position === 13 ? 'Free' : n.number}
                {/* {n.number} */}
            </button>

        </>
    )
}