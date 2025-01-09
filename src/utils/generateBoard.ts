import { board } from "../data/board";
import { numbers } from "../data/numbers"
import { Board } from "../types/index";

// Tener en cuenta si un metodo muta el arreglo original o no
// https://doesitmutate.xyz/

// Investigar sobre el algoritmo de Fisher-Yates
// https://keepcoding.io/blog/algoritmo-de-barajado-de-fisher-yates-en-js/

// Siempre el tablero de bingo es de 5 * 5, cada fila contiene 5 números, la primera fila contiene números del 1 al 15, la segunda del 16 al 30, la tercera del 31 al 45, la cuarta del 46 al 60 y la quinta del 61 al 75

// La función debe retornar un arreglo de arreglos, donde cada arreglo contiene 5 números aleatorios de cada fila, es decir, 5 arreglos de 5 números cada uno
export const getRowNumbers = (row: number) => {
    // Busca el primer elemento que cumpla con la condición
    const selectedRow = numbers.find((r) => r.row === row);
    if (selectedRow) {
        // SORT MUTA EL ARREGLO ORIGINAL
        // const shuffledValues = [...selectedRow.values].sort(() => 0.5 - Math.random());

        // Realiza un shuffle sin mutar el arreglo original
        const shuffledValues = fisherYatesShuffle([...selectedRow.values]);
        const result = shuffledValues.slice(0, 5);
        // console.log(shuffledValues)
        // console.log(result)
        // EL CENTRO DEBE SER UN 0
        if (row === 3) {
            result[2] = 0;
        }
        return result
    }

    return []
}


// Implementación del algoritmo de Fisher-Yates
function fisherYatesShuffle(array: number[]): number[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}



// POSIBLE SOLUCIÓN
export const assignNumbersBoard = (
    first: number[],
    second: number[],
    third: number[],
    fourth: number[],
    fifth: number[]
) => {

    const array = [...first, ...second, ...third, ...fourth, ...fifth]

    let result: Board = []
    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
    //     board[index].number = element

    //     result = [...result, board[index]]
    // }
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // Clona el objeto para evitar mutaciones
        const boardItem = { ...board[index], number: element };
        result = [...result, boardItem];
    }

    return [...result]
}



export const generateBoard = () => {

    const numbers = assignNumbersBoard(
        getRowNumbers(1),
        getRowNumbers(2),
        getRowNumbers(3),
        getRowNumbers(4),
        getRowNumbers(5)
    )

    // console.log(numbers)

    return numbers
}

// export const checkNumber = (number: number, board: any) => {
//     // Se busca si el número seleccionado está en el tablero
//     const selectedNumber = board.find((n: any) => n.number === number);
//     if (selectedNumber) {
//         // Si el número está en el tablero, se marca como encontrado
//         selectedNumber.found = true;
//         return true
//     }
//     return false
// }


// FUNCIÓN UTILIZADA ANTERIORMENTE
// export const getRowNumbers = (row: number) => {
//     const selectedRow = numbers.find((r) => r.row === row);
//     const randomValues = selectedRow?.values.sort(() => 0.5 - Math.random());
//     const selectedValues = randomValues?.slice(0, 5);
//     return selectedValues
// }

// Se asigna el numero aleatorio obtenido de getRowNumbers a cada numero de la posición del tablero en board en orden