type ButtonNumberProps = {
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    handleIsSelectedNumber: (idBoard: number, position: number) => boolean,
    value: {
        number: number,
        position: number
    },
    idBoard: number
}

export default function ButtonNumber({ handleClickButton, handleIsSelectedNumber, value, idBoard }: ButtonNumberProps) {
    return (
        <>
            <button
                // Recuerda handleIsSelectedNumber retorna un valor booleano, se especifica un estilo de acuerdo a la 
                // condición ternaria
                className={`sm:text-2xl text-xl font-bold sm:w-16 sm:h-16 w-12 h-12 border-none rounded-lg text-white hover:bg-cyan-700 active:bg-cyan-600 transition duration-300 
                    ${handleIsSelectedNumber(idBoard, value.position) === true ? "bg-cyan-500" : "bg-gray-500"}`}

                // Al hacer clic, marca el numero llamando a handleClickButton
                onClick={() => handleClickButton(idBoard, value.number, value.position)}>

                {/* El numero del centro es 0, pero se muestra el texto 'Free' */}
                {value.position === 13 ? 'Free' : value.number}
            </button>
        </>
    )
}