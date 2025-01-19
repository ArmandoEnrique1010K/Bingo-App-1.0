import { numbers } from "../data/numbers";

// Función para generar los números objetivos
export function generateTargets(quantity: number) {

    // FlatMap nos permite aplanar un arreglo de arreglos en un solo arreglo con todos los elementos.
    // Aquí, obtenemos todos los números posibles de bingo (1 al 75) a partir del arreglo `numbers`.
    const allNumbers = numbers.flatMap(n => n.values);

    // Inicializamos un arreglo vacío para almacenar los números aleatorios seleccionados.
    let randomNumbers: number[] = [];

    // Mientras no se haya alcanzado la cantidad deseada de números objetivos (quantity), seguimos generando.
    while (randomNumbers.length < quantity) {

        // Selecciona un índice aleatorio basado en el tamaño actual del arreglo `allNumbers`.
        const index = Math.floor(Math.random() * allNumbers.length);

        // Verifica si el número seleccionado ya está en el arreglo de números aleatorios.
        if (!randomNumbers.includes(allNumbers[index])) {
            // Si no está incluido, se agrega al arreglo `randomNumbers`.
            randomNumbers = [...randomNumbers, allNumbers[index]];
        }

        // Elimina el número seleccionado de `allNumbers` para evitar repeticiones futuras.
        // Usamos splice, que modifica el arreglo eliminando el número en la posición `index`.
        allNumbers.splice(index, 1);
    }

    // Devuelve el arreglo de números aleatorios generados.
    return randomNumbers;
}
