const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

// Arreglo de las columnas de las posiciones del tablero
export const getPositionsBoard = () => {
  const rows: number[][] = [];

  for (let i = 0; i < numbers.length; i += 5) {
    rows.push(numbers.slice(i, i + 5));
  }

  return rows;
}
