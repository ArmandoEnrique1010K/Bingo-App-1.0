// Implementación del algoritmo de Fisher-Yates
export const fisherYatesShuffle = (array: number[]): number[] => {
    // Crea una copia del arreglo para no modificar el original
    const result = [...array]

    // Genera un índice aleatorio entre 0 e i
    // Intercambia los valores en las posiciones i y j
    for (let i = result.length -  1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    // Retorna el arreglo barajado, solamente los primeros 5 elementos
    const firstFiveNumbers = result.slice(0,5)
    // console.log('ALGORITMO DE FISHER YATES: ' + firstFiveNumbers)
    return firstFiveNumbers;
}


// Aplica el principio de inmutabilidad en React, pues sort() es un metodo que muta el arreglo original
// Tener en cuenta si un metodo muta el arreglo original o no
// https://doesitmutate.xyz/

// Investigar sobre el algoritmo de Fisher-Yates
// https://keepcoding.io/blog/algoritmo-de-barajado-de-fisher-yates-en-js/
// https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates