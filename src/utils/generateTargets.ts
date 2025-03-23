// Genera una lista de números objetivos aleatorios sin repetir
export function generateTargets(quantity: number, excludedNumbers: number[]) {
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
        .filter(n => !excludedNumbers.includes(n));

    if (quantity > availableNumbers.length) {
        throw new Error("La cantidad solicitada excede los números disponibles.");
    }

    return Array.from({ length: quantity }, () => {
        const index = Math.floor(Math.random() * availableNumbers.length);
        return availableNumbers.splice(index, 1)[0]; // Extrae y elimina el número seleccionado
    });
}