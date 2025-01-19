import { board } from "../data/board";
import { numbers } from "../data/numbers"
import { Board } from "../types/index";

// Tener en cuenta si un metodo muta el arreglo original o no
// https://doesitmutate.xyz/

// Investigar sobre el algoritmo de Fisher-Yates
// https://keepcoding.io/blog/algoritmo-de-barajado-de-fisher-yates-en-js/
// https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates

// Siempre el tablero de bingo es de 5 * 5, cada columna contiene 5 números,
// la primera columna contiene números del 1 al 15
// la segunda           ''             del 16 al 30, 
// la tercera           ''             del 31 al 45, 
// la cuarta            ''             del 46 al 60
// la quinta            ''             del 61 al 75.

// La función debe retornar un arreglo de arreglos, donde cada arreglo contiene 5 números 
// aleatorios de cada columna, es decir, 5 arreglos de 5 números cada uno
export const getRowNumbers = (row: number) => {
    // Busca el primer elemento que cumpla con la condición
    const selectedRow = numbers.find((r) => r.row === row);

    if (selectedRow) {

        // El metodo sort muta el arreglo original
        // const shuffledValues = [...selectedRow.values].sort(() => 0.5 - Math.random());

        // Baraja los 15 números de la columna seleccionada utilizando el algoritmo de Fisher-Yates
        // Nota: Se crea una copia del arreglo original para evitar mutaciones
        const shuffledValues = fisherYatesShuffle([...selectedRow.values]);

        // Selecciona los primeros 5 números del arreglo barajado
        const result = shuffledValues.slice(0, 5);

        // Asegura que el número central del tablero (posición [3][2]) sea un 0
        if (row === 3) {
            shuffledValues[2] = 0;
        }

        return result;
    }

    // Retorna un arreglo vacío si no se encuentra la columna
    return []
}

// TODO: REDUCIR LA LATENCIA DE ESTA FUNCIÓN, SOLAMENTE DEBERIA ELEGIR LOS 5 PRIMEROS NUMEROS

// Implementación del algoritmo de Fisher-Yates
function fisherYatesShuffle(array: number[]): number[] {
    // Crea una copia del arreglo para no modificar el original
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        // Genera un índice aleatorio entre 0 e i
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambia los valores en las posiciones i y j
        [result[i], result[j]] = [result[j], result[i]];
    }

    // Retorna el arreglo barajado
    return result;
}

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
        const boardItem = { ...board[index], number: element };
        // Actualiza el resultado sin modificar el tablero original
        result = [...result, boardItem];

    })

    // for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
    //     const boardItem = { ...board[index], number: element };
    //     result = [...result, boardItem];
    // }

    // Retorna el tablero generado
    return [...result];
}

// Función principal para generar un tablero completo de bingo
export const generateBoard = () => {
    // Obtiene los números aleatorios para cada columna y los asigna al tablero
    const numbers = assignNumbersBoard(
        getRowNumbers(1), // Números aleatorios para la fila 1
        getRowNumbers(2), // Números aleatorios para la fila 2
        getRowNumbers(3), // Números aleatorios para la fila 3 (incluye el 0 en el centro)
        getRowNumbers(4), // Números aleatorios para la fila 4
        getRowNumbers(5)  // Números aleatorios para la fila 5
    );
    return numbers; // Retorna el tablero completo
};
