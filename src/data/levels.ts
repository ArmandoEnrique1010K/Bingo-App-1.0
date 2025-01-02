import { Level } from "../types";

// Esto es un tablero de bingo de 5 * 5
// 1   6  11  16  21
// 2   7  12  17  22
// 3   8  13  18  23
// 4   9  14  19  24
// 5  10  15  20  25

// Aqui se especifica los niveles, incluyendo los posibles patrones ganadores por cada nivel del juego
export const levels: Level[] = [
    {
        level: 1,
        targetQuantity: 3,
        targetText: "A column o row of five numbers",
        // Objetivo: Una columna o fila de 5 numeros
        patterns: [
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20],
            [21, 22, 23, 24, 25],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [5, 10, 15, 20, 25],
        ],
        bots: [
            {
                name: "Slow Bot",
                // Tiempo de respuesta del bot en milisegundos
                interval: 2500,
            }
        ]

    },
    {
        level: 2,
        targetQuantity: 3,
        targetText: "A little cross of five numbers",
        // Objetivo: Una pequeña cruz 5 numeros
        patterns: [
            [6, 2, 7, 12, 8],
            [11, 7, 12, 17, 13],
            [16, 12, 17, 22, 18],
            [7, 3, 8, 13, 9],
            [12, 8, 13, 18, 14],
            [17, 13, 18, 23, 19],
            [8, 4, 9, 14, 10],
            [13, 9, 14, 19, 15],
            [18, 14, 19, 24, 20],
        ],
        bots: [
            {
                name: "Slow Bot",
                interval: 1900,
            },
        ]
    },
    {
        level: 3,
        targetQuantity: 3,
        targetText: "A box of six numbers",
        // Objetivo: Un cuadro de 6 numeros
        patterns: [
            [1, 2, 6, 7, 11, 12],
            [2, 3, 7, 8, 12, 13],
            [3, 4, 8, 9, 13, 14],
            [4, 5, 9, 10, 14, 15],
            [6, 7, 11, 12, 16, 17],
            [7, 8, 12, 13, 17, 18],
            [8, 9, 13, 14, 18, 19],
            [9, 10, 14, 15, 19, 20],
            [11, 12, 16, 17, 21, 22],
            [12, 13, 17, 18, 22, 23],
            [13, 14, 18, 19, 23, 24],
            [14, 15, 19, 20, 24, 25],
        ],
        bots: [
            {
                name: "Middle Bot",
                interval: 1500,
            }
        ]
    },
    {
        level: 4,
        targetQuantity: 10,
        targetText: "A four squared",
        // Objetivo: Cuatro al cuadrado
        patterns: [
            [1, 6, 11, 16, 2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19],
            [2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19, 5, 10, 15, 20],
            [6, 11, 16, 21, 7, 12, 17, 22, 8, 13, 18, 23, 9, 14, 19, 24],
            [7, 12, 17, 22, 8, 13, 18, 23, 9, 14, 19, 24, 10, 15, 20, 25],
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1800,
            }
        ]
    },

    // Nivel 5 es con 2 bots
    {
        level: 5,
        targetQuantity: 3,
        targetText: "A little letter 'X'",
        // Objetivo: Una letra X de 5 numeros
        patterns: [
            [1, 11, 7, 3, 13],
            [6, 16, 12, 8, 18],
            [11, 21, 17, 13, 23],
            [2, 12, 8, 4, 14],
            [7, 17, 13, 9, 19],
            [12, 22, 18, 14, 24],
            [3, 13, 9, 5, 15],
            [8, 18, 14, 10, 20],
            [13, 23, 19, 15, 25],
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1900,
            },
            {
                name: "Bot2",
                interval: 1600,
            }
        ]
    },

    // Este es un nivel con un solo patrón
    {
        level: 6,
        targetQuantity: 4,
        targetText: "The number one",
        // Objetivo: El numero 1
        // Nota: Solo hay una combinación
        patterns: [
            [
                11,
                7, 12,
                13,
                14,
                10, 15, 20
            ],
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1800,
            },
            {
                name: "Bot2",
                interval: 1500,
            }
        ]
    },
    {
        // ¿Primer nivel dificil?
        level: 7,
        targetQuantity: 3,
        targetText: "Double Target Complicated",
        // Objetivo: Una gran aspa de 9 numeros y una cruz de 5 numeros que comience desde el centro
        // Nota: Existe 4 combinaciones
        patterns: [
            [1, 21, 7, 17, 13, 9, 19, 5, 25,
                11, 7, 12, 17, 18
            ],
            [1, 21, 7, 17, 13, 9, 19, 5, 25,
                17, 13, 18, 23, 19
            ],
            [1, 21, 7, 17, 13, 9, 19, 5, 25,
                13, 9, 14, 19, 15
            ],
            [1, 21, 7, 17, 13, 9, 19, 5, 25,
                7, 3, 8, 13, 9
            ]
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1800,
            },
        ]
    },


    {
        level: 8,
        targetQuantity: 4,
        targetText: "F from fast and speed",
        // Objetivo: La letra F
        patterns: [
            [
                1, 6, 11, 16, 21,
                2,
                3, 8, 13,
                4,
                5,
            ]
        ],
        bots: [
            // Tu oponente es un bot de alta velocidad
            {
                name: "Fast Bot",
                interval: 800
            }
        ]
    },


    // Ocho cuartos (a partir de aqui comienzan los niveles con 4 bots)
    {
        level: 12,
        targetQuantity: 3,
        targetText: "Eight quarters of cake",
        // Objetivo: Los 8 numeros más alejados del tablero y el centro del tablero
        patterns: [
            [
                1, 11, 21,

                3, 13, 23,

                5, 15, 25
            ]
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1700,
            },
            {
                name: "Bot2",
                interval: 2500,
            },
            {
                name: "Bot3",
                interval: 2000,
            },
            {
                name: "Bot4",
                interval: 1300,
            },
        ]
    }


]
// Esto es un tablero de bingo de 5 * 5
// 1   6  11  16  21
// 2   7  12  17  22
// 3   8  13  18  23
// 4   9  14  19  24
// 5  10  15  20  25




// NUEVAS IDEAS PARA NIVELES
// Niveles con hasta 4 bots a la vez
// Bots con un tiempo de respuesta minimo de 0.5 segundos (más rapido)
// Patrones unicos (solamente 1 combincación o patrón)
// Aumentar el numero de objetivos de 3 a 4 o 5 (maximo)
// ¿Nivel final es marcar todos los numeros del tablero?








// https://stackoverflow.com/questions/35435042/how-can-i-define-an-array-of-objects
// https://stackoverflow.com/questions/23161486/create-strongly-typed-array-of-arrays-in-typescript

// PODRIA SERVIR
// https://github.com/nsamelson/AIGameRunner/blob/a51fad7b8ed9ffeb3c972ccb65c29030c2b9985e/public/games/quixo.js