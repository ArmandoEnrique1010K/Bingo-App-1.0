// Definicion de los types para especificar los tipos de datos

// Nivel (objeto)
export type Level = {
    level: number
    targetText: string
    boards: number
    patterns: Pattern[] // Arreglo de patrones ganadores
    bots: Bot[] // Arreglo de bots
    color: string // Colores
    music: Music
}

// Patrón ganador (arreglo de números)
// Este es un arreglo bidimensional o matriz (arreglo que contiene otro arreglo, cuyos elementos 
// son numeros) para los patrones de los posibles patrones ganadores en el tablero
export type Pattern = number[]

// Bot u oponente simulado (objeto)
export type Bot = {
    name: string
    interval: number
    boards: number
}

// Numeros en el tablero (arreglo de objetos)
export type Numbers = {
    row: number, // Columna
    values: number[] // Valores
}[]

// Tablero de numeros (arreglo de objetos)
export type Board = {
    position: number, // Posición
    number: number // Número

    // No se recomienda utilizar el sistema de coordenadas, por el momento
    // x: number,
    // y: number,
}[]

// Tableros con un identificador (arreglo de objetos)
export type BoardID = {
    id: number
    board: Board
}[]

// Numeros seleccionados en el tablero (arreglo de objetos)
export type SelectedNumbers = {
    // Se utiliza idBoard, porque en algunos niveles puede tener más de 1 tablero
    idBoard: number,
    numbers: number[]
}[]

// Posiciones seleccionadas en el tablero (arreglo de objetos)
export type SelectedPositions = {
    idBoard: number,
    positions: number[]
}[]

// TODO: ELIMINAR ESTO
// Resultado de los numeros encontrados por los bots
export type ResultNumberBoardsBot = {
    idBoard: number,
    targets: {
        position: number,
        number: number
    }[]
}[]

// DATOS DE UNA VENTANA MODAL
export type Modal = {
    type: string
    title: string
    message: string
    textButton: {
        left: string
        right: string
    }

}

// export type Color = {
//     bgOn: string
//     bgOnHover: string,
//     bgOnActive: string,

// }

export type Winner = 'none' | 'player' | 'bot' | 'end' | ''

export type Music = {
    name: string
    volume: number
}

export type Direction = 'left' | 'right'