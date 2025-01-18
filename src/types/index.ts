// Definicion de tipos de datos para el juego de Bingo


// Datos de un nivel
export type Level = {
    level: number
    targetQuantity: number
    targetText: string
    boards: number
    // Este es un arreglo bidimensional o matriz (arreglo que contiene otro arreglo, cuyos elementos son numeros) para los patrones de los posibles patrones ganadores en el tablero
    patterns: Pattern[]
    bots: Bot[]
}

export type Pattern = number[]

export type Bot = {
    name: string
    interval: number
    boards: number
}

// Arreglo de numeros
export type Numbers = {
    row: number,
    values: number[]
}[]

// Cada numero del tablero tiene una posicion y el numero
export type Board = {
    position: number,
    // x: number,
    // y: number,
    number: number
}[]

// export type BoardLevel = Omit<Board, 'x' | 'y'>

// POTENCIADOR
// export type PowerUp = {
//     id: number,
//     name: string,
//     status: boolean
// }