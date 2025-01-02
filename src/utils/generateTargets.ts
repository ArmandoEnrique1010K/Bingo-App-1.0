import { numbers } from "../data/numbers";

// Función para generar los números objetivos
export function generateTargets(quantity: number) {

    // FlatMap es una función que nos permite recorrer un arreglo de arreglos y obtener un solo arreglo con todos los elementos
    const allNumbers = numbers.flatMap(n => n.values);

    // Arreglo para guardar los números aleatorios
    const randomNumbers: number[] = []

    // Selecciona números aleatorios de acuerdo a quantity
    while (randomNumbers.length < quantity) {

        // Selecciona un número aleatorio
        const index = Math.floor(Math.random() * allNumbers.length);

        // Los numeros aleatorios no se pueden repetir en el arreglo
        if (!randomNumbers.includes(allNumbers[index])) {
            randomNumbers.push(allNumbers[index]);
        }

        // Elimina el número seleccionado para no repetirlo

        // Splice es una función que nos permite eliminar elementos de un arreglo, recibe la posición del elemento a eliminar y la cantidad de elementos a eliminar
        allNumbers.splice(index, 1);
    }

    return randomNumbers;
}