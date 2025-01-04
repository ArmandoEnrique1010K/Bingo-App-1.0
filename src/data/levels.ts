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
        targetText: "A column or row of five numbers",
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
                interval: 2400,
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
                interval: 1800,
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
                interval: 1300,
            }
        ]
    },
    {
        level: 4,
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
        // Ahora son 2 bots tipo "Slow"
        bots: [
            {
                name: "Slow Bot 1",
                interval: 2000,
            },
            {
                name: "Slow Bot 2",
                interval: 1700,
            }
        ]
    },

    // A PARTIR DE AQUI COMIENZAN LOS NIVELES DEL 5 AL 20

    {
        level: 0,
        targetQuantity: 3,
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
                name: "Middle Bot",
                interval: 1100,
            }
        ]
    },


    {
        level: 0,
        targetQuantity: 3,
        targetText: "Two Squares in diagonals",
        // Objetivo: Dos cuadrados en diagonales
        patterns: [
            [1, 6, 2, 7, 19, 24, 20, 25],
            [4, 9, 5, 10, 16, 21, 17, 22],
        ],
        bots: [
            {
                name: "Slow Bot",
                interval: 1800,
            },
            {
                name: "Middle Bot",
                interval: 1400,
            }
        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "F for fast",
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
                interval: 700
            }
        ]
    },





    // Este es un nivel con un solo patrón
    {
        level: 0,
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
        // Nivel con 2 objetivos en el tablero
        level: 0,
        targetQuantity: 3,
        targetText: "Big 'X' and Little '+'",
        // Objetivo: Una gran aspa de 9 numeros y una cruz de 5 numeros que comience desde el centro
        // Nota: Existe 4 combinaciones
        patterns: [
            [
                1, 21,
                7, 17,
                13, 18, 23,
                9, 19,
                5, 25,
            ],
            [
                1, 21,
                7, 17,
                13,
                9, 14, 19,
                5, 15, 25,
            ],
            [
                1, 21,
                7, 17,
                3, 8, 13,
                9, 19,
                5, 25,
            ],
            [
                1, 11, 21,
                7, 12, 17,
                13,
                9, 19,
                5, 25,
            ],
        ],
        bots: [
            {
                name: "Bot1",
                interval: 1800,
            },
        ]
    },




    {
        level: 0,
        targetQuantity: 3,
        targetText: "Eight quarters",
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
                name: "Middle Bot 1",
                interval: 1700,
            },
            {
                name: "Slow Bot 1",
                interval: 2500,
            },
            {
                name: "Slow Bot 2",
                interval: 2000,
            },
            {
                name: "Middle Bot 2",
                interval: 1300,
            },
        ]
    },


    {
        level: 0,
        targetQuantity: 3,
        targetText: "This eye was watching me",
        // Objetivo: OJO
        patterns: [
            [
                6, 11, 16,
                2, 22,
                3, 13, 23,
                4, 24,
                10, 15, 20,
            ]
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "Invert letter 'X'",
        // Objetivo: Aspa Invertida
        patterns: [
            [
                6, 11, 16,
                2, 12, 22,
                3, 8, 18, 23,
                4, 14, 24,
                10, 15, 20
            ]
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "Hi bot",
        // Objetivo: Letra 'H' y letra 'I'
        patterns: [
            [
                1, 11, 21,
                2, 12, 22,
                3, 8, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ]
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "Staircase",
        // Objetivo: Escalera de 5 numeros
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17, 22,
                13, 18, 23,
                19, 24,
                25,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9, 14, 19,
                5, 10, 15, 20, 25,
            ],
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "A piramid",
        // Objetivo: Una piramide de 8 numeros
        patterns: [
            [
                13,
                9, 14, 19,
                5, 10, 15, 20, 25,
            ],
            [
                1, 6, 11, 16, 21,
                7, 12, 17,
                13,
            ],
            [
                1,
                2, 7,
                3, 8, 13,
                4, 9,
                5,
            ],
            [
                21,
                17, 22,
                13, 18, 23,
                19, 24,
                25,
            ],
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "3 Bars",
        // Objetivo: 3 Filas o 3 columnas separadas
        patterns: [
            [
                1, 6, 11, 16, 21,
                3, 8, 13, 18, 23,
                5, 10, 15, 20, 25,
            ],
            [
                1, 11, 21,
                2, 12, 22,
                3, 13, 23,
                4, 14, 24,
                5, 15, 25,
            ],
        ],
        bots: [

        ]
    },

    {
        level: 0,
        targetQuantity: 3,
        targetText: "Nine squares",
        // Objetivo: Cuadrado de 9 numeros
        patterns: [
            [
                1, 6, 11,
                2, 7, 12,
                3, 8, 13,
            ],
            [
                6, 11, 16,
                7, 12, 17,
                8, 13, 18,
            ],
            [
                11, 16, 21,
                12, 17, 22,
                13, 18, 23,
            ],
            [
                2, 7, 12,
                3, 8, 13,
                4, 9, 14,
            ],
            [
                7, 12, 17,
                8, 13, 18,
                9, 14, 19,
            ],
            [
                12, 17, 22,
                13, 18, 23,
                14, 19, 24,
            ],
            [
                3, 8, 13,
                4, 9, 14,
                5, 10, 15,
            ],
            [
                8, 13, 18,
                9, 14, 19,
                10, 15, 20,
            ],
            [
                13, 18, 23,
                14, 19, 24,
                15, 20, 25,
            ],
        ],
        bots: [

        ]
    },

    {
        // Nivel con 2 objetivos en el tablero
        level: 0,
        targetQuantity: 3,
        targetText: "Big '+' and Little 'X'",
        // Objetivo: Una gran cruz de 9 numeros y una letra 'X' de 5 numeros que comience desde el centro
        // Nota: Existe 4 combinaciones
        patterns: [
            [
                1, 11,
                7, 12,
                3, 8, 13, 18, 23,
                14,
                15,
            ],
            [
                11, 21,
                12, 17,
                3, 8, 13, 18, 23,
                14,
                15,
            ],
            [
                11,
                12,
                3, 8, 13, 18, 23,
                14, 19,
                15, 25,
            ],
            [
                11,
                12,
                3, 8, 13, 18, 23,
                9, 14,
                5, 15,
            ],



        ],
        bots: [
            {
                name: "Bot1",
                interval: 1800,
            },
        ]
    },



    {
        // Nivel Final
        level: 0,
        targetQuantity: 3,
        targetText: "Invert Diamond",
        // Objetivo: Un diamante invertido
        patterns: [
            [
                1, 6, 16, 21,
                2, 12, 22,
                8, 13, 18,
                4, 14, 24,
                5, 10, 20, 25,
            ]
        ],
        bots: [
            {
                name: "Middle Bot 1",
                interval: 1200,
            },
            {
                name: "Slow Bot",
                interval: 1800,
            },
            {
                name: "Middle Bot 2",
                interval: 1500,
            },
            {
                name: "Middle Bot 3",
                interval: 1300,
            },
            {
                name: "Fast Bot 1",
                interval: 700
            },
            {
                name: "Fast Bot 2",
                interval: 600
            }
        ]
    },


    //

    //




    // {
    //     level: 19,
    //     targetQuantity: 5,
    //     targetText: "Ying & Yang",
    //     // Objetivo: El Ying y el Yang
    //     patterns: [
    //         [
    //             X, X, 11, 16, 21,
    //             X, 7, 12, 17, X,
    //             3, 8, 13, X, X,
    //             4, 9, X, X, 24,
    //             5, X, X, 20, 25,
    //         ],
    //         [
    //             1, 6, 11, 16, 21,
    //             2, 7, 12, 17, 22,
    //             3, 8, 13, 18, 23,
    //             4, 9, 14, 19, 24,
    //             5, 10, 15, 20, 25,
    //         ]
    //     ],
    //     bots: [

    //     ]
    // },


    {
        // Nivel Final
        level: 20,
        targetQuantity: 5,
        targetText: "Final Duel",
        // Objetivo: Todo el tablero debe estar marcado
        patterns: [
            [
                1, 6, 11, 16, 21,
                2, 7, 12, 17, 22,
                3, 8, 13, 18, 23,
                4, 9, 14, 19, 24,
                5, 10, 15, 20, 25,
            ]
        ],
        bots: [
            {
                name: "Middle Bot 1",
                interval: 1200,
            },
            {
                name: "Slow Bot",
                interval: 1800,
            },
            {
                name: "Middle Bot 2",
                interval: 1500,
            },
            {
                name: "Middle Bot 3",
                interval: 1300,
            },
            {
                name: "Fast Bot 1",
                interval: 700
            },
            {
                name: "Fast Bot 2",
                interval: 600
            }
        ]
    },


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