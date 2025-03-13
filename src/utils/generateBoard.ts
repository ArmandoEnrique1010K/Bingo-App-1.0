import { assignNumbersBoard } from "./assignNumbersBoard";
import { getColumnNumbers } from "./getColumnNumbers";


// Siempre el tablero de bingo es de 5 * 5, cada columna contiene 5 números,
// la primera columna contiene números del 1 al 15
// la segunda           ''             del 16 al 30, 
// la tercera           ''             del 31 al 45, 
// la cuarta            ''             del 46 al 60
// la quinta            ''             del 61 al 75.


// Función principal para generar un tablero completo de bingo
export const generateBoard = () => {

// Retorna el tablero completo
    // Obtiene los números aleatorios para cada columna y los asigna al tablero
    return assignNumbersBoard(
        getColumnNumbers(1), // Números aleatorios para la fila 1
        getColumnNumbers(2), // Números aleatorios para la fila 2
        getColumnNumbers(3), // Números aleatorios para la fila 3 (incluye el 0 en el centro)
        getColumnNumbers(4), // Números aleatorios para la fila 4
        getColumnNumbers(5)  // Números aleatorios para la fila 5
    );
};