import { useMemo } from "react";
import { SelectedNumbers } from "../../types";

type ButtonNumberProps = {
    handleClickButton: (idBoard: number, number: number, position: number) => void,
    handleIsSelectedNumber: (idBoard: number, position: number) => boolean,
    value: {
        number: number,
        position: number
    },
    idBoard: number
    selectedNumbers: SelectedNumbers
    color: string
}

export default function ButtonNumber({ handleClickButton, handleIsSelectedNumber, value, idBoard, selectedNumbers, color }: ButtonNumberProps) {

    // CONTINUAR AQUI
    const selectNumber = useMemo(() => handleIsSelectedNumber(idBoard, value.position), [selectedNumbers]);


    const activeColor = useMemo(() => selectNumber === true ? color : 'gray', [selectedNumbers]);

    // console.log(bgOnHover)
    return (
        <>
            <button
                // Recuerda handleIsSelectedNumber retorna un valor booleano, se especifica un estilo de acuerdo a la 
                // condición ternaria
                // className={`sm:text-2xl text-xl font-bold sm:w-16 sm:h-16 w-12 h-12 border-none rounded-lg text-white hover:${bgOnHover} active:${bgOnActive} transition duration-300 ${activeColor}`}

                // className={`${bgOn} text-white font-semibold sm:px-6 px-4 sm:py-3 py-2 text-sm sm:text-base
                // rounded-lg shadow-black shadow-md transition duration-300 sm:mb-4 
                // bg-gray-300 opacity-50 cursor-not-allowed hover:${bgOnHover} active:${bgOnActive}`}


                //                     hover:bg-cyan-700 active:bg-cyan-600 

                className={`sm:text-2xl text-xl font-bold sm:w-16 sm:h-16 w-12 h-12 border-none rounded-lg text-white transition duration-300 bg-${activeColor}-500`}
                // Al hacer clic, marca el numero llamando a handleClickButton
                onClick={() => handleClickButton(idBoard, value.number, value.position)}>

                {/* El numero del centro es 0, pero se muestra el texto 'Free' */}
                {value.position === 13 ? 'Free' : value.number}
            </button>
        </>
    )
}