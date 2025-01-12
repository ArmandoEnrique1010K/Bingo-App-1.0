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

export type Pattern = {
    x: number,
    y: number
}[]

export type Bot = {
    name: string
    interval: number
}

// Arreglo de numeros
export type Numbers = {
    row: number,
    values: number[]
}[]

// Cada numero del tablero tiene una posicion y el numero
export type Board = {
    position: Position
    number: number
}[]

export type Position = {
    x: number,
    y: number
}

// POTENCIADOR
export type PowerUp = {
    id: number,
    name: string,
    status: boolean
}