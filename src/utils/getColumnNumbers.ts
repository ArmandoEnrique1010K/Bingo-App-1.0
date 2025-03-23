import { numbers } from "../data/numbers";
import { fisherYatesShuffle } from "./fisherYatesShuffle";

// Obtiene y baraja los números de una columna específica del tablero
export const getColumnNumbers = (row: number) => {
    const selectedRow = numbers.find((r) => r.row === row);

    if (!selectedRow) return []

    const shuffledValues = fisherYatesShuffle([...selectedRow.values]);

    // Asegura que el número central del tablero sea un 0
    if (row === 3) {
        shuffledValues[2] = 0;
    }

    return shuffledValues;
}