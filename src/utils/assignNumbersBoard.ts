import { board } from "../data/board";
import { Board } from "../types";

// Función para asignar números a cada posición del tablero
export const assignNumbersBoard = (
    first: number[],
    second: number[],
    third: number[],
    fourth: number[],
    fifth: number[]
) => {

    // Combina los números de las cinco columnas en un solo arreglo
    const columnNumbers = [...first, ...second, ...third, ...fourth, ...fifth]

    // Inicializa el tablero como un arreglo vacío
    let result: Board = []

    // Itera sobre cada elemento de array
    columnNumbers.forEach((element, index) => {
        // Clona el objeto de la posición del tablero y asigna el número correspondiente
        // la propiedad position se mantiene
        const boardItem = { ...board[index], number: element };
        // Actualiza el resultado sin modificar el tablero original
        result = [...result, boardItem];
    })

    // Retorna el tablero generado
    return result;
}
