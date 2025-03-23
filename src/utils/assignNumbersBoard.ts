import { board } from "../data/board";

// Asigna números a las posiciones del tablero de bingo
export const assignNumbersBoard = (
    first: number[],
    second: number[],
    third: number[],
    fourth: number[],
    fifth: number[]
) => {

    const columnNumbers = [...first, ...second, ...third, ...fourth, ...fifth]

    return columnNumbers.map((number, index) => ({ ...board[index], number }));
}