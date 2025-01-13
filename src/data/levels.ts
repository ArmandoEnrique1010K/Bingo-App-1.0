import { Level } from "../types";

// Esto es un tablero de bingo de 5 * 5
// 1   6  11  16  21
// 2   7  12  17  22
// 3   8  13  18  23
// 4   9  14  19  24
// 5  10  15  20  25


// LISTA DE NIVELES
// 1. Una columna o fila de 5 numeros
// 2. Una pequeña cruz 5 numeros
// 3. Un cuadro de 6 numeros
// 4. Una letra X de 5 numeros
// 5. Dos cuadrados en diagonales

// 6. Cuatro al cuadrado
// 7. OJO
// 8. La letra F
// 9. Los 8 numeros más alejados del tablero y el centro del tablero
// 10. Una gran aspa de 9 numeros y una cruz de 5 numeros que comience desde el centro

// 11. El numero 1
// 12. Letra 'H' y letra 'I'
// 13. Cuadrado de 9 numeros
// 14. Una piramide de 8 numeros
// 15. Aspa Invertida

// 16. 3 Filas o 3 columnas separadas
// 17. Un diamante invertido
// 18. Una gran cruz de 9 numeros y una letra 'X' de 5 numeros que comience desde el centro
// 19. Escalera de 15 numeros
// 20. Todo el tablero debe estar marcado


// Posiciones de los numeros en el tablero
/*
1   6   11  16  21
2   7   12  17  22
3   8   13  18  23
4   9   14  19  24
5   10  15  20  25
*/

// Nueva posición (x,y )
/*
0,4     1,4     2,4     3,4     4,4
0,3     1,3     2,3     3,3     4,3
0,2     1,2     2,2     3,2     4,2
0,1     1,1     2,1     3,1     4,1
0,0     1,0     2,0     3,0     4,0
*/

// Aqui se especifica los niveles, incluyendo los posibles patrones ganadores por cada nivel del juego
export const levels: Level[] = [
    {
        level: 1,
        targetQuantity: 5,
        targetText: "Una columna o una fila de 5 números",
        boards: 2,
        patterns: [
            [{ x: 0, y: 4 }, { x: 0, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
            [{ x: 1, y: 4 }, { x: 1, y: 3 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
            [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 2 }, { x: 2, y: 1 }, { x: 2, y: 0 }],
            [{ x: 3, y: 4 }, { x: 3, y: 3 }, { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 }],
            [{ x: 4, y: 4 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 0 }],

            [{ x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }],
            [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
            [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }],
            [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }]

        ],
        bots: [
            {
                name: "S-Bot",
                // Tiempo de respuesta del bot en milisegundos
                interval: 1000,
                boards: 4
            }
        ]

    },
    {
        level: 2,
        targetQuantity: 5,
        targetText: "Una cruz de 5 números",
        boards: 1,
        // Posiciones de los numeros en el tablero
        /*
        1   6   11  16  21
        2   7   12  17  22
        3   8   13  18  23
        4   9   14  19  24
        5   10  15  20  25
        */

        // Nueva posición (x,y )
        /*
        0,4     1,4     2,4     3,4     4,4
        0,3     1,3     2,3     3,3     4,3
        0,2     1,2     2,2     3,2     4,2
        0,1     1,1     2,1     3,1     4,1
        0,0     1,0     2,0     3,0     4,0
        */

        patterns: [

            [{ x: 1, y: 4 }, { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 2 }],
            [{ x: 2, y: 4 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }],
            [{ x: 3, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 2 }],

            [{ x: 1, y: 3 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }],
            [{ x: 2, y: 3 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 1 }],
            [{ x: 3, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 1 }],

            [{ x: 1, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }],
            [{ x: 2, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 0 }],
            [{ x: 3, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 3, y: 0 }],

        ],
        bots: [
            {
                name: "S-Bot-1",
                interval: 100,
                boards: 3
            },
            {
                name: "S-Bot-2",
                interval: 100,
                boards: 2
            },
        ]
    },
    {
        level: 3,
        targetQuantity: 3,
        targetText: "Un rectangulo de 6 números",
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
                name: "M-Bot",
                interval: 1400,
            }
        ]
    },
    {
        level: 4,
        targetQuantity: 3,
        targetText: "Un aspa de 5 números",
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
                name: "S-Bot 1",
                interval: 2000,
            },
            {
                name: "S-Bot 2",
                interval: 1600,
            }
        ]
    },
    {
        level: 5,
        targetQuantity: 3,
        targetText: "2 cuadrados de 4 números en 2 diagonales",
        patterns: [
            [1, 6, 2, 7, 19, 24, 20, 25],
            [4, 9, 5, 10, 16, 21, 17, 22],
        ],
        bots: [
            {
                name: "M-Bot",
                interval: 1400,
            },
            {
                name: "S-Bot",
                interval: 1800,
            },
        ]
    },
    {
        level: 6,
        targetQuantity: 3,
        targetText: "Un cuadrado de 16 números",
        // Objetivo: Cuatro al cuadrado
        patterns: [
            [1, 6, 11, 16, 2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19],
            [2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19, 5, 10, 15, 20],
            [6, 11, 16, 21, 7, 12, 17, 22, 8, 13, 18, 23, 9, 14, 19, 24],
            [7, 12, 17, 22, 8, 13, 18, 23, 9, 14, 19, 24, 10, 15, 20, 25],
        ],
        bots: [
            {
                name: "M-Bot 1",
                interval: 1500,
            },
            {
                name: "M-Bot 2",
                interval: 1400,
            }
        ]
    },
    {
        // A partir de este nivel se muestran 4 números objetivos
        level: 7,
        targetQuantity: 4,
        targetText: "El ojo",
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
            {
                name: "M-Bot",
                interval: 1300,
            },
            {
                name: "S-Bot",
                interval: 1700,
            },
        ]
    },
    {
        level: 8,
        targetQuantity: 4,
        targetText: "La letra 'F'",
        patterns: [
            // TODO: AÑADIR MÁS PATRONES
            [
                1, 6, 11, 16, 21,
                2,
                3, 8, 13, 18,
                4,
                5,
            ],
            [
                1, 6, 11, 16, 21,
                22,
                8, 13, 18, 23,
                24,
                25
            ],
            [
                21,
                22,
                8, 13, 18, 23,
                24,
                5, 10, 15, 20, 25
            ],
            [
                1,
                2,
                3, 8, 13, 18,
                4,
                5, 10, 15, 20, 25
            ]
        ],
        bots: [
            // Tu oponente es un bot de alta velocidad
            {
                name: "F-Bot",
                interval: 800
            },
            {
                name: "S-Bot",
                interval: 1600
            }

        ]
    },
    //     S - Bot: 2200 - 1600
    // M - Bot: 1500 - 1000
    // F - Bot: 900 - 500

    {
        level: 9,
        targetQuantity: 4,
        targetText: "Tres en línea a la inversa",
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
                name: "S-Bot 1",
                interval: 1800,
            },
            {
                name: "S-Bot 2",
                interval: 2000,
            },
            {
                name: "S-Bot 3",
                interval: 2200,
            },
        ]
    },
    {
        // Nivel con 2 objetivos en el tablero
        level: 10,
        targetQuantity: 4,
        targetText: "Un aspa de 9 números y una cruz de 5 números que empiece del centro",
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
                name: "Middle Bot 1",
                interval: 1800,
            },
            {
                name: "Slow Bot",
                interval: 1800,
            },
            {
                name: "Middle Bot 2",
                interval: 1800,
            },
        ]
    },
    {
        level: 11,
        targetQuantity: 4,
        targetText: "El número 1",
        // Objetivo: El numero 1
        // TODO: AGREGAR MÁS COMBINACIONES
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
        level: 12,
        targetQuantity: 4,
        targetText: "Las letras 'H' e 'I'",
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
        level: 13,
        targetQuantity: 4,
        targetText: "Un cuadrado de 9 números",
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
        // 5 BOTS
        bots: [
            {
                name: "F-Bot 1",
                interval: 800
            },
            {
                name: "M-Bot 2",
                interval: 1400
            },
            {
                name: "S-Bot",
                interval: 2000
            },
            {
                name: "M-Bot 1",
                interval: 1500
            },
            {
                name: "F-Bot 2",
                interval: 900
            }

        ]
    },
    // A partir de este nivel son 5 números objetivos
    {
        level: 14,
        targetQuantity: 5,
        targetText: "Una piramide simetrica de 8 números",
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
        level: 15,
        targetQuantity: 5,
        targetText: "Un aspa a la inversa",
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
        level: 16,
        targetQuantity: 5,
        targetText: "3 filas o 3 columnas separadas",
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
        // Nivel Final
        level: 17,
        targetQuantity: 5,
        targetText: "Un diamante a la inversa",
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
    {
        // Nivel con 2 objetivos en el tablero
        level: 18,
        targetQuantity: 5,
        targetText: "Una cruz de 9 números y un aspa de 5 números que comience del centro",
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
        level: 19,
        targetQuantity: 5,
        targetText: "Una escalera de 15 números",
        // Objetivo: Escalera de 15 numeros
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
            {
                name: "Fast Bot 1",
                interval: 900
            },
            {
                name: "Fast Bot 2",
                interval: 700
            },
            {
                name: "Fast Bot 3",
                interval: 600
            },
            {
                name: "Fast Bot 4",
                interval: 800
            },
        ]
    },
    {
        // Nivel Final
        level: 20,
        targetQuantity: 5,
        targetText: "Marca todo el tablero",
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
            // 8 BOTS
            {
                name: "Middle Bot 1",
                interval: 1200,
            },
            {
                name: "Slow Bot 1",
                interval: 1800,
            },
            {
                name: "Fast Bot 1",
                interval: 700
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
                name: "Fast Bot 2",
                interval: 600
            },
            {
                name: "Slow Bot 2",
                interval: 2000,
            },
            {
                name: "Fast Bot 3",
                interval: 800
            },
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

