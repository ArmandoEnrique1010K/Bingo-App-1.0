type BotSquareNumberProps = {
    handleSelectedPosition: (idBoard: number, position: number) => boolean,
    value: {
        number: number,
        position: number
    },
    idBoard: number
}

export default function BotSquareNumber({ handleSelectedPosition, value, idBoard }: BotSquareNumberProps) {
    return (
        <>
            <div
                // Aplica un estilo de acuerdo a la condición ternaria
                className={`text-sm w-6 h-6 text-center border-2 border-gray-600 text-white 
                    ${handleSelectedPosition(idBoard, value.position) === true
                        ? "bg-cyan-500"
                        : "bg-gray-500"}`
                }
            >
                {/* El bot no muestra los numeros de su tablero */}
                {value.position === 13 ? 'F' : /* value.number */ ''}
            </div>
        </>
    )
}
