import { assignNumbersBoard } from "./assignNumbersBoard";
import { getColumnNumbers } from "./getColumnNumbers";

// Genera un tablero de bingo de 5x5 con números aleatorios en cada columna.

// Cada columna contiene:
// - 1ª columna: Números del 1 al 15.
// - 2ª columna: Números del 16 al 30.
// - 3ª columna: Números del 31 al 45 (el centro es 0).
// - 4ª columna: Números del 46 al 60.
// - 5ª columna: Números del 61 al 75.

export const generateBoard = () => {
    return assignNumbersBoard(
        getColumnNumbers(1),
        getColumnNumbers(2),
        getColumnNumbers(3),
        getColumnNumbers(4),
        getColumnNumbers(5)
    );
};