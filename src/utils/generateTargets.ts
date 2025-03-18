// Genera un arreglo de numeros desde el 1 hasta el 75
let allNumbers = Array.from({ length: 75 }, (_, index) => index + 1);

// Genera los números objetivos y los devuelve en un arreglo
export function generateTargets(quantity: number, excludedNumbers: number[]) {

    // Filtrar los números excluidos de `allNumbers`
    // allNumbers = allNumbers.filter(n => !excludedNumbers.includes(n));

    // Restablecer allNumbers si excludedNumbers está vacío
    if (excludedNumbers.length === 0) {
        allNumbers = Array.from({ length: 75 }, (_, index) => index + 1);
    } else {
        // Filtrar los números excluidos de `allNumbers`
        allNumbers = allNumbers.filter(n => !excludedNumbers.includes(n));
    }


    // Validar que haya suficientes números disponibles
    if (quantity > allNumbers.length) {
        throw new Error("La cantidad solicitada excede el número de números disponibles después de excluir los números no permitidos.");
    }

    // Inicializamos un arreglo vacío para almacenar los números aleatorios seleccionados.
    let randomNumbers: number[] = [];

    // Mientras no se haya alcanzado la cantidad deseada de números objetivos (quantity), seguimos generando.
    while (randomNumbers.length < quantity) {

        // Selecciona un índice aleatorio basado en el tamaño actual del arreglo `allNumbers`.
        const index = Math.floor(Math.random() * allNumbers.length);

        // Verifica si el número seleccionado ya está en el arreglo de números aleatorios.
        // if (!randomNumbers.includes(allNumbers[index])) {
        //     // Si no está incluido, se agrega al arreglo `randomNumbers`.
        //     randomNumbers = [...randomNumbers, allNumbers[index]];

        // }

        // console.log(randomNumbers)
        // Elimina el número seleccionado de `allNumbers` para evitar repeticiones futuras.
        // Usamos splice, que modifica el arreglo eliminando el número en la posición `index`.
        // Extraer el número y agregarlo a los números aleatorios
        const selectedNumber = allNumbers[index];

        // Agrega el número seleccionado
        randomNumbers = [...randomNumbers, selectedNumber];

        // Eliminar el número seleccionado del conjunto de números restantes
        // Actualizar `allNumbers` eliminando el número seleccionado
        allNumbers = allNumbers.filter(n => n !== selectedNumber);
    }

    // console.log("Números seleccionados:", randomNumbers);
    // console.log("Números restantes:", allNumbers);

    // Devuelve el arreglo de números aleatorios generados.
    return randomNumbers;
}
