// Definicion de tipos de datos para el juego de Bingo


// Datos de un nivel
export type Level = {
    level: number
    targetQuantity: number
    targetText: string
    // Este es un arreglo bidimensional o matriz (arreglo que contiene otro arreglo, cuyos elementos son numeros) para los patrones de los posibles patrones ganadores en el tablero
    patterns: number[][]
    bots: Bot[]
}

export type Bot = {
    name: string
    interval: number
}

// Arreglo de numeros
export type Numbers = {
    row: number,
    values: number[]
}[]

//
export type Board = {
    position: number,
    number: number
}[]